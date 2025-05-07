import requests
import json
import copy
from player import positions, formations
from all_overalls0 import calculate_overall_list
import sys

clubId=sys.argv[1]
url = f"https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/clubs/{clubId}/players"
response = requests.get(url=url)
data = response.json()


def compute_B11(data) :
    Overalls=[] 
    for player in data : 
        Overalls.append(player['metadata']['overall'])
    Overalls=sorted(Overalls, reverse=True)[:11]
    return sum(Overalls)

def compute_B16(data) :
    Overalls=[] 
    for player in data : 
        Overalls.append(player['metadata']['overall'])
    Overalls=sorted(Overalls, reverse=True)[:16]
    return sum(Overalls)/16

B11=compute_B11(data)
B11A=B11/11
print("B11")
print(B11)
print('B11 moyenne')
print(round(B11A,2))
B16 = compute_B16(data)
print(round(B16,2))

AllOveralls=calculate_overall_list(data,positions)

BestPlayers=[]
for position in positions:
    BestPlayers.append({
        "position":position["name"],
        "players":sorted(
            [player for player in AllOveralls if player["position"] == position["name"]], 
            key=lambda x: x["overall"], 
            reverse=True
        )[:3]}
    )

for formation in formations : 
    Players=copy.deepcopy(BestPlayers)
    formationName = list(formation.keys())[0]
    positions =list(formation[formationName].values())
    rating=0
    for position in positions : 
        for pos in Players :
            if pos['position'] == position['position'] :
                players=pos['players']
                position['players']=players[0]
                rating+=players[0]["overall"]
                players.pop(0)
                break
    formation['rating']=rating

formations = sorted(formations, key=lambda x: x["rating"], reverse=True)
IG11= round(formations[0]['rating']/11,2)
print(IG11)
Alt=0.5*(formations[1]['rating']/11+formations[2]['rating']/11)
print(round(0.25*(B11A+B16+IG11+Alt),2))