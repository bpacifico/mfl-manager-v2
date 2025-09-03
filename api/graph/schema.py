from graphene import ObjectType, String, Int, Boolean, Field, List, ID, DateTime, Float, Argument
import enum
from bson import ObjectId


class UserType(ObjectType):
    id = ID(source='_id')
    address = String()
    email = String()
    name = String()
    confirmation_code = String()
    is_email_confirmed = Boolean()


class ClubHistoryType(ObjectType):
    date = DateTime()
    B11 = Int()
    B16A = Int()
    IG11 = Int()
    MMR = Int()
    playerNb = Int()

class ClubType(ObjectType):
    id = Int(source='_id')
    status = String()
    name = String()
    division = Int()
    city = String()
    country = String()
    logoVersion = String()
    last_computation_date = DateTime()
    #players=List(PlayerType)
    owner = Field(UserType)
    activeCompetitions = List(Int)
    B11 = Int()
    B16A = Int() #stocker x100 pour que ce soit un entier
    IG11 = Int() #x100
    MMR = Int() #x100
    playerNb = Int()
    LastChamp = Int() #pour renvoyer direct au proj du dernier championnat ?
    history = List(
        ClubHistoryType,
        start_date=Argument(DateTime),
        end_date=Argument(DateTime)
    )

    def resolve_history(self, info, start_date=None, end_date=None):
        snapshots = self.get("history", [])  # <-- ici on utilise .get()
        if start_date or end_date:
            filtered = []
            for snap in snapshots:
                if start_date and snap["date"] < start_date:
                    continue
                if end_date and snap["date"] > end_date:
                    continue
                filtered.append(snap)
            return filtered
        return snapshots




class CompetitionRankingType(ObjectType):
    clubId = Int()
    wins = Int()
    draws = Int()
    losses = Int()
    points = Int()
    goals = Int()
    goalsAgainst = Int()
    played = Int()  # = wins + draws + losses

class CompetitionRankingHistoryType(ObjectType):
    date = DateTime()
    rankings = List(CompetitionRankingType)




class CompetitionType(ObjectType):
    id = Int(source='_id')
    season = Int() #season.id
    seasonName = String() #season.name
    participants = List(ClubType)
    name = String()
    status = String()
    type = String()
    last_computation_date = DateTime()
    starting_date = DateTime()
    rankingHistory = List(
        CompetitionRankingHistoryType,
        start_date=DateTime(),
        end_date=DateTime()
    )

    async def resolve_participants(parent, info):
        db = info.context["db"]

        # Ta liste est comme [{'_id': 1234}, {'_id': 5678}]
        club_ids = [entry['_id'] for entry in parent.get('participants', [])]

        clubs = await db.clubs.find({"_id": {"$in": club_ids}}).to_list(None)
        return clubs

    def resolve_rankingHistory(self, info, start_date=None, end_date=None):
        snapshots = self.get("rankingHistory", [])
        if start_date or end_date:
            return [
                snap for snap in snapshots
                if (not start_date or snap["date"] >= start_date)
                and (not end_date or snap["date"] <= end_date)
            ]
        return snapshots

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
    club = Field(ClubType)
    owner = Field(UserType)

class NonceType(ObjectType):
    id = ID(source='_id')
    address = String()
    nonce = String()
