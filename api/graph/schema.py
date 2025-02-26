from graphene import ObjectType, String, Int, Boolean, Field, List, ID, DateTime, Float
import enum
from bson import ObjectId


class UserType(ObjectType):
    id = ID(source='_id')
    address = String()
    email = String()
    name = String()
    confirmation_code = String()
    is_email_confirmed = Boolean()


class PlayerType(ObjectType):
    id = Int(source='_id')
    first_name = String()
    last_name = String()
    overall = Int()
    nationalities = List(String)
    positions = List(String)
    height = Int()
    preferred_foot = String()
    age_at_mint = Int()
    pace = Int()
    shooting = Int()
    passing = Int()
    dribbling = Int()
    defense = Int()
    physical = Int()
    goalkeeping = Int()
    resistance = Int()
    owner = Field(UserType)


class NonceType(ObjectType):
    id = ID(source='_id')
    address = String()
    nonce = String()
