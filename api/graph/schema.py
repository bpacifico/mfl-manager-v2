from graphene import ObjectType, String, Int, Field, List, Enum, ID, Date
import enum

class NotificationScopeTypeEnum(enum.Enum):
    LISTING = "listing"
    CONTRACT = "contract"
    SALE = "sale"

class UserType(ObjectType):
    id = ID()
    address = String()
    email = String()
    is_email_confirmed = bool()
    notification_scopes = List(lambda: NotificationScopeType)

class NotificationScopeType(ObjectType):
    id = ID()
    type = String() # Enum.from_enum(NotificationScopeTypeEnum)
    positions = List(lambda: String())
    min_price = Int()
    max_price = Int()
    min_age = Int()
    max_age = Int()
    min_ovr = Int()
    max_ovr = Int()
    min_pac = Int()
    max_pac = Int()
    min_dri = Int()
    max_dri = Int()
    min_pas = Int()
    max_pas = Int()
    min_sho = Int()
    max_sho = Int()
    min_def = Int()
    max_def = Int()
    min_phy = Int()
    max_phy = Int()
    creation_date = Date()
    last_computation_date = Date()
    user = Field(UserType)
    notifications = List(lambda: NotificationType)

class NotificationType(ObjectType):
    id = ID()
    notification_scope = Field(NotificationScopeType)
    content = String()
    user = Field(UserType)
