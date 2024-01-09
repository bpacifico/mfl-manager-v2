from graphene import ObjectType, String, Int, Field, List

class UserType(ObjectType):
    id = Int()
    name = String()
    notification_scopes = List(lambda: NotificationScopeType)

class NotificationScopeType(ObjectType):
    id = Int()
    user = Field(UserType)
    notifications = List(lambda: NotificationType)
    positions = List(lambda: String())
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

class NotificationType(ObjectType):
    id = Int()
    user = Field(UserType)
    notification_scope = Field(NotificationScopeType)
    content = String()
