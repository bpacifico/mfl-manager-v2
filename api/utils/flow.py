from flow_py_sdk.exceptions import PySDKError
from flow_py_sdk.client import AccessAPI, flow_client
from flow_py_sdk.script import Script
from flow_py_sdk.utils import CompositeSignature
from flow_py_sdk import cadence
from rlp import encode


async def verify_signature(service):
    try:
        account_address = service["address"]
        nonce = service["nonce"]
        key_id = service["signatures"][0]["keyId"]
        signature = service["signatures"][0]["signature"]
    except KeyError:
        return False

    async with flow_client(host="access.mainnet.nodes.onflow.org", port=9000) as client:
        account = await client.get_account(
            address=cadence.Address.from_hex(account_address)
        )

        fields = encode(
            [
                "mfl-assistant",
                account.address,
                bytes.fromhex(nonce)
            ]
        )

        signer = CompositeSignature(
            addr=account.address.hex(),
            keyId=key_id,
            signature=signature
        )
        is_verified = await _verify_account_proof_signatures(
            client=client, message=bytes(fields.hex(), "utf-8"), composite_signatures=[signer]
        )
        return is_verified


async def _verify_account_proof_signatures(*, client: AccessAPI, message: bytes,
                                          composite_signatures: list[CompositeSignature]
                                          ) -> bool:
    # if there is no signature return False
    if len(composite_signatures) == 0:
        return False

    # it does not make sense for the signatures to be from different addresses
    if any(x.addr != composite_signatures[0].addr for x in composite_signatures):
        raise PySDKError("All signatures must be from the same address")

    address = cadence.Address.from_hex(composite_signatures[0].addr)
    signatures = cadence.Array(
        [cadence.String(x.signature) for x in composite_signatures]
    )
    key_indexes = cadence.Array([cadence.Int(x.keyId) for x in composite_signatures])
    cadence_message = cadence.String(str(message, "utf-8"))

    address_of_network = "0xdb6b70764af4ff68" # This is for Mainnet - Testnet address being: 0x5b250a8a85b44a67

    script = Script(
        code=
        f'''        
        import FCLCrypto from {address_of_network}
        pub fun main(address: Address,
                     message: String,
                     keyIndices: [Int],
                     signatures: [String]): Bool''' + '''{
            return FCLCrypto.verifyAccountProofSignatures(address: address, message: message, keyIndices: keyIndices, 
            signatures: signatures)
         }   
        ''',
        arguments=[
            address,
            cadence_message,
            key_indexes,
            signatures,
        ],
    )

    script_result = await client.execute_script(script)

    if script_result is None:
        return False

    return script_result.as_type(cadence.Bool).value
