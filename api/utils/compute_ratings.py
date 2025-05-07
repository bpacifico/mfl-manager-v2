import requests
import json
import copy
from utils.player import positions, formations
from utils.all_overalls import calculate_overall_list
import sys


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
    return round(sum(Overalls)/16,2)*100




def compute_formations(data,positions,formations) :
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
    return formations
