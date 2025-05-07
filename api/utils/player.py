# player.py

positions = [
    {"name": "GK", "rowIndex": 6, "columnIndex": 1},
    {"name": "RB", "rowIndex": 5, "columnIndex": 2},
    {"name": "LB", "rowIndex": 5, "columnIndex": 0},
    {"name": "CB", "rowIndex": 5, "columnIndex": 1},
    {"name": "RWB", "rowIndex": 4, "columnIndex": 2},
    {"name": "LWB", "rowIndex": 4, "columnIndex": 0},
    {"name": "CDM", "rowIndex": 4, "columnIndex": 1},
    {"name": "RM", "rowIndex": 3, "columnIndex": 2},
    {"name": "LM", "rowIndex": 3, "columnIndex": 0},
    {"name": "CM", "rowIndex": 3, "columnIndex": 1},
    {"name": "CAM", "rowIndex": 2, "columnIndex": 1},
    {"name": "RW", "rowIndex": 1, "columnIndex": 2},
    {"name": "LW", "rowIndex": 1, "columnIndex": 0},
    {"name": "CF", "rowIndex": 1, "columnIndex": 1},
    {"name": "ST", "rowIndex": 0, "columnIndex": 1},
]

scarcity = [
    {"name": "Common", "overallMin": 1, "overallMax": 64, "color": "#9f9f9f"},
    {"name": "Uncommon", "overallMin": 65, "overallMax": 74, "color": "#71ff30"},
    {"name": "Rare", "overallMin": 75, "overallMax": 84, "color": "#0047ff"},
    {"name": "Legendary", "overallMin": 85, "overallMax": 99, "color": "#fa53ff"},
]

position_attributes = {
    "ST": {"passing": 0.10, "shooting": 0.46, "defense": 0.00, "dribbling": 0.29, "pace": 0.10, "physical": 0.05, "goalkeeping": 0.00},
    "CF": {"passing": 0.24, "shooting": 0.23, "defense": 0.00, "dribbling": 0.40, "pace": 0.13, "physical": 0.00, "goalkeeping": 0.00},
    "LW": {"passing": 0.24, "shooting": 0.23, "defense": 0.00, "dribbling": 0.40, "pace": 0.13, "physical": 0.00, "goalkeeping": 0.00},
    "RW": {"passing": 0.24, "shooting": 0.23, "defense": 0.00, "dribbling": 0.40, "pace": 0.13, "physical": 0.00, "goalkeeping": 0.00},
    "CAM": {"passing": 0.34, "shooting": 0.21, "defense": 0.00, "dribbling": 0.38, "pace": 0.07, "physical": 0.00, "goalkeeping": 0.00},
    "CM": {"passing": 0.43, "shooting": 0.12, "defense": 0.10, "dribbling": 0.29, "pace": 0.00, "physical": 0.06, "goalkeeping": 0.00},
    "LM": {"passing": 0.43, "shooting": 0.12, "defense": 0.10, "dribbling": 0.29, "pace": 0.00, "physical": 0.06, "goalkeeping": 0.00},
    "RM": {"passing": 0.43, "shooting": 0.12, "defense": 0.10, "dribbling": 0.29, "pace": 0.00, "physical": 0.06, "goalkeeping": 0.00},
    "CDM": {"passing": 0.28, "shooting": 0.00, "defense": 0.40, "dribbling": 0.17, "pace": 0.00, "physical": 0.15, "goalkeeping": 0.00},
    "LWB": {"passing": 0.19, "shooting": 0.00, "defense": 0.44, "dribbling": 0.17, "pace": 0.10, "physical": 0.10, "goalkeeping": 0.00},
    "RWB": {"passing": 0.19, "shooting": 0.00, "defense": 0.44, "dribbling": 0.17, "pace": 0.10, "physical": 0.10, "goalkeeping": 0.00},
    "LB": {"passing": 0.19, "shooting": 0.00, "defense": 0.44, "dribbling": 0.17, "pace": 0.10, "physical": 0.10, "goalkeeping": 0.00},
    "RB": {"passing": 0.19, "shooting": 0.00, "defense": 0.44, "dribbling": 0.17, "pace": 0.10, "physical": 0.10, "goalkeeping": 0.00},
    "CB": {"passing": 0.05, "shooting": 0.00, "defense": 0.64, "dribbling": 0.09, "pace": 0.02, "physical": 0.20, "goalkeeping": 0.00},
    "GK": {"passing": 0.00, "shooting": 0.00, "defense": 0.00, "dribbling": 0.00, "pace": 0.00, "physical": 0.00, "goalkeeping": 1.00}
}

familiarity = {
    "GK": {"GK": 1, "CB": 4, "RB": 4, "LB": 4, "RWB": 4, "LWB": 4, "CDM": 4, "CM": 4, "CAM": 4, "RM": 4, "LM": 4, "RW": 4, "LW": 4, "CF": 4, "ST": 4},
    "CB": {"GK": 4, "CB": 1, "RB": 3, "LB": 3, "RWB": 4, "LWB": 4, "CDM": 3, "CM": 4, "CAM": 4, "RM": 4, "LM": 4, "RW": 4, "LW": 4, "CF": 4, "ST": 4},
    "RB": {"GK": 4, "CB": 3, "RB": 1, "LB": 3, "RWB": 2, "LWB": 4, "CDM": 4, "CM": 4, "CAM": 4, "RM": 3, "LM": 4, "RW": 4, "LW": 4, "CF": 4, "ST": 4},
    "LB": {"GK": 4, "CB": 3, "RB": 3, "LB": 1, "RWB": 4, "LWB": 2, "CDM": 4, "CM": 4, "CAM": 4, "RM": 4, "LM": 3, "RW": 4, "LW": 4, "CF": 4, "ST": 4},
    "RWB": {"GK": 4, "CB": 4, "RB": 2, "LB": 4, "RWB": 1, "LWB": 3, "CDM": 4, "CM": 4, "CAM": 4, "RM": 3, "LM": 4, "RW": 3, "LW": 4, "CF": 4, "ST": 4},
    "LWB": {"GK": 4, "CB": 4, "RB": 4, "LB": 2, "RWB": 3, "LWB": 1, "CDM": 4, "CM": 4, "CAM": 4, "RM": 4, "LM": 3, "RW": 4, "LW": 3, "CF": 4, "ST": 4},
    "CDM": {"GK": 4, "CB": 3, "RB": 4, "LB": 4, "RWB": 4, "LWB": 4, "CDM": 1, "CM": 2, "CAM": 3, "RM": 4, "LM": 4, "RW": 4, "LW": 4, "CF": 4, "ST": 4},
    "CM": {"GK": 4, "CB": 4, "RB": 4, "LB": 4, "RWB": 4, "LWB": 4, "CDM": 2, "CM": 1, "CAM": 2, "RM": 3, "LM": 3, "RW": 4, "LW": 4, "CF": 4, "ST": 4},
    "CAM": {"GK": 4, "CB": 4, "RB": 4, "LB": 4, "RWB": 4, "LWB": 4, "CDM": 3, "CM": 2, "CAM": 1, "RM": 4, "LM": 4, "RW": 4, "LW": 4, "CF": 2, "ST": 4},
    "RM": {"GK": 4, "CB": 4, "RB": 3, "LB": 4, "RWB": 3, "LWB": 4, "CDM": 4, "CM": 3, "CAM": 4, "RM": 1, "LM": 3, "RW": 2, "LW": 4, "CF": 4, "ST": 4},
    "LM": {"GK": 4, "CB": 4, "RB": 4, "LB": 3, "RWB": 4, "LWB": 3, "CDM": 4, "CM": 3, "CAM": 4, "RM": 3, "LM": 1, "RW": 4, "LW": 2, "CF": 4, "ST": 4},
    "RW": {"GK": 4, "CB": 4, "RB": 4, "LB": 4, "RWB": 3, "LWB": 4, "CDM": 4, "CM": 4, "CAM": 4, "RM": 2, "LM": 4, "RW": 1, "LW": 3, "CF": 4, "ST": 4},
    "LW": {"GK": 4, "CB": 4, "RB": 4, "LB": 4, "RWB": 4, "LWB": 3, "CDM": 4, "CM": 4, "CAM": 4, "RM": 4, "LM": 2, "RW": 3, "LW": 1, "CF": 4, "ST": 4},
    "CF": {"GK": 4, "CB": 4, "RB": 4, "LB": 4, "RWB": 4, "LWB": 4, "CDM": 4, "CM": 4, "CAM": 2, "RM": 4, "LM": 4, "RW": 4, "LW": 4, "CF": 1, "ST": 2},
    "ST": {"GK": 4, "CB": 4, "RB": 4, "LB": 4, "RWB": 4, "LWB": 4, "CDM": 4, "CM": 4, "CAM": 4, "RM": 4, "LM": 4, "RW": 4, "LW": 4, "CF": 2, "ST": 1}
}


def get_overall_color(overall):
    """
    Returns the color corresponding to a player's overall rating based on scarcity levels.
    """
    for level in scarcity:
        if overall <= level["overallMax"]:
            return level["color"]
    
    return "black"


def get_calculated_overall(player, position):
    """
    Calculates the overall rating for a player in a specific position.
    Takes into account position attributes and position familiarity.
    """
    overall = 0
    
    # Calculate base overall using position attributes
    for attr, weight in position_attributes[position].items():
        overall += weight * player[attr]
    
    overall = round(overall)
    
    # Adjust for position familiarity
    if player["positions"][0] != position:
        if position in player["positions"]:
            overall -= 1
        else:
            f = familiarity[player["positions"][0]][position]
            
            if f == 2:
                overall -= 5
            elif f == 3:
                overall -= 8
            else:
                overall -= 20
    
    return overall


def get_malus(player, position):
    """
    Returns the rating penalty (malus) for a player in a non-primary position.
    """
    malus = 0
    
    if player["positions"][0] != position:
        if position in player["positions"]:
            malus = -1
        else:
            f = familiarity[player["positions"][0]][position]
            
            if f == 2:
                malus = -5
            elif f == 3:
                malus = -8
            else:
                malus = -20
    
    return malus

formations = [{ "3-4-2-1": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 25, "y": 75, "position": "CB" },
    "3": { "x": 50, "y": 75, "position": "CB" },
    "4": { "x": 75, "y": 75, "position": "CB" },
    "5": { "x": 15, "y": 55, "position": "LM" },
    "6": { "x": 38, "y": 55, "position": "CM" },
    "7": { "x": 62, "y": 55, "position": "CM" },
    "8": { "x": 85, "y": 55, "position": "RM" },
    "9": { "x": 30, "y": 35, "position": "CF" },
    "10": { "x": 70, "y": 35, "position": "CF" },
    "11": { "x": 50, "y": 22, "position": "ST" }
  }},{
  "3-4-3": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 25, "y": 75, "position": "CB" },
    "3": { "x": 50, "y": 75, "position": "CB" },
    "4": { "x": 75, "y": 75, "position": "CB" },
    "5": { "x": 15, "y": 55, "position": "LM" },
    "6": { "x": 38, "y": 55, "position": "CM" },
    "7": { "x": 62, "y": 55, "position": "CM" },
    "8": { "x": 85, "y": 55, "position": "RM" },
    "9": { "x": 25, "y": 30, "position": "LW" },
    "10": { "x": 50, "y": 22, "position": "ST" },
    "11": { "x": 75, "y": 30, "position": "RW" }
  }},{
  "3-4-3 (diamond)": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 25, "y": 75, "position": "CB" },
    "3": { "x": 50, "y": 75, "position": "CB" },
    "4": { "x": 75, "y": 75, "position": "CB" },
    "5": { "x": 15, "y": 50, "position": "LM" },
    "6": { "x": 50, "y": 60, "position": "CDM" },
    "7": { "x": 50, "y": 40, "position": "CAM" },
    "8": { "x": 85, "y": 50, "position": "RM" },
    "9": { "x": 25, "y": 30, "position": "LW" },
    "10": { "x": 50, "y": 22, "position": "ST" },
    "11": { "x": 75, "y": 30, "position": "RW" }
  }},{
  "3-5-2": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 25, "y": 75, "position": "CB" },
    "3": { "x": 50, "y": 75, "position": "CB" },
    "4": { "x": 75, "y": 75, "position": "CB" },
    "5": { "x": 15, "y": 40, "position": "LM" },
    "6": { "x": 28, "y": 52, "position": "CM" },
    "7": { "x": 50, "y": 60, "position": "CDM" },
    "8": { "x": 72, "y": 52, "position": "CM" },
    "9": { "x": 85, "y": 40, "position": "RM" },
    "10": { "x": 40, "y": 25, "position": "ST" },
    "11": { "x": 60, "y": 25, "position": "ST" }
  }},{
  "3-5-2 (B)": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 25, "y": 75, "position": "CB" },
    "3": { "x": 50, "y": 75, "position": "CB" },
    "4": { "x": 75, "y": 75, "position": "CB" },
    "5": { "x": 15, "y": 40, "position": "LM" },
    "6": { "x": 30, "y": 60, "position": "CDM" },
    "7": { "x": 50, "y": 45, "position": "CAM" },
    "8": { "x": 70, "y": 60, "position": "CDM" },
    "9": { "x": 85, "y": 40, "position": "RM" },
    "10": { "x": 40, "y": 25, "position": "ST" },
    "11": { "x": 60, "y": 25, "position": "ST" }
  }},{
  "4-1-2-1-2": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 50, "y": 60, "position": "CDM" },
    "7": { "x": 15, "y": 48, "position": "LM" },
    "8": { "x": 85, "y": 48, "position": "RM" },
    "9": { "x": 50, "y": 35, "position": "CAM" },
    "10": { "x": 35, "y": 20, "position": "ST" },
    "11": { "x": 65, "y": 20, "position": "ST" }
  }},{
  "4-1-2-1-2 (narrow)": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 50, "y": 60, "position": "CDM" },
    "7": { "x": 20, "y": 48, "position": "CM" },
    "8": { "x": 80, "y": 48, "position": "CM" },
    "9": { "x": 50, "y": 35, "position": "CAM" },
    "10": { "x": 35, "y": 20, "position": "ST" },
    "11": { "x": 65, "y": 20, "position": "ST" }
  }},{
  "4-1-4-1": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 50, "y": 60, "position": "CDM" },
    "7": { "x": 15, "y": 38, "position": "LM" },
    "8": { "x": 35, "y": 45, "position": "CM" },
    "9": { "x": 65, "y": 45, "position": "CM" },
    "10": { "x": 85, "y": 38, "position": "RM" },
    "11": { "x": 50, "y": 20, "position": "ST" }
  }},{
  "4-1-3-2": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 50, "y": 60, "position": "CDM" },
    "7": { "x": 25, "y": 40, "position": "LM" },
    "8": { "x": 50, "y": 40, "position": "CM" },
    "9": { "x": 75, "y": 40, "position": "RM" },
    "10": { "x": 40, "y": 20, "position": "ST" },
    "11": { "x": 60, "y": 20, "position": "ST" }
  }},{
  "4-2-2-2": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 40, "y": 58, "position": "CDM" },
    "7": { "x": 60, "y": 58, "position": "CDM" },
    "8": { "x": 30, "y": 40, "position": "CAM" },
    "9": { "x": 70, "y": 40, "position": "CAM" },
    "10": { "x": 40, "y": 20, "position": "ST" },
    "11": { "x": 60, "y": 20, "position": "ST" }
  }},{
  "4-2-3-1": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 35, "y": 58, "position": "CDM" },
    "7": { "x": 65, "y": 58, "position": "CDM" },
    "8": { "x": 25, "y": 40, "position": "LM" },
    "9": { "x": 50, "y": 40, "position": "CAM" },
    "10": { "x": 75, "y": 40, "position": "RM" },
    "11": { "x": 50, "y": 20, "position": "ST" }
  }},{
  "4-2-4": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 35, "y": 52, "position": "CM" },
    "7": { "x": 65, "y": 52, "position": "CM" },
    "8": { "x": 20, "y": 30, "position": "LW" },
    "9": { "x": 40, "y": 20, "position": "ST" },
    "10": { "x": 60, "y": 20, "position": "ST" },
    "11": { "x": 80, "y": 30, "position": "RW" }
  }},{
  "4-3-1-2": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 20, "y": 50, "position": "CM" },
    "7": { "x": 50, "y": 55, "position": "CM" },
    "8": { "x": 80, "y": 50, "position": "CM" },
    "9": { "x": 50, "y": 35, "position": "CAM" },
    "10": { "x": 30, "y": 20, "position": "ST" },
    "11": { "x": 70, "y": 20, "position": "ST" }
  }},{
  "4-3-2-1": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 25, "y": 55, "position": "CM" },
    "7": { "x": 50, "y": 55, "position": "CM" },
    "8": { "x": 75, "y": 55, "position": "CM" },
    "9": { "x": 30, "y": 35, "position": "CF" },
    "10": { "x": 70, "y": 35, "position": "CF" },
    "11": { "x": 50, "y": 20, "position": "ST" }
  }},{
  "4-3-3": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 25, "y": 55, "position": "CM" },
    "7": { "x": 50, "y": 55, "position": "CM" },
    "8": { "x": 75, "y": 55, "position": "CM" },
    "9": { "x": 20, "y": 30, "position": "LW" },
    "10": { "x": 80, "y": 30, "position": "RW" },
    "11": { "x": 50, "y": 20, "position": "ST" }
  }},{
  "4-3-3 (att)": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 25, "y": 55, "position": "CM" },
    "7": { "x": 50, "y": 45, "position": "CAM" },
    "8": { "x": 75, "y": 55, "position": "CM" },
    "9": { "x": 20, "y": 30, "position": "LW" },
    "10": { "x": 80, "y": 30, "position": "RW" },
    "11": { "x": 50, "y": 20, "position": "ST" }
  }},{
  "4-3-3 (def)": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 25, "y": 50, "position": "CM" },
    "7": { "x": 50, "y": 60, "position": "CDM" },
    "8": { "x": 75, "y": 50, "position": "CM" },
    "9": { "x": 20, "y": 30, "position": "LW" },
    "10": { "x": 80, "y": 30, "position": "RW" },
    "11": { "x": 50, "y": 20, "position": "ST" }
  }},{
  "4-3-3 (false 9)": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 25, "y": 50, "position": "CM" },
    "7": { "x": 50, "y": 60, "position": "CDM" },
    "8": { "x": 75, "y": 50, "position": "CM" },
    "9": { "x": 20, "y": 25, "position": "LW" },
    "10": { "x": 80, "y": 25, "position": "RW" },
    "11": { "x": 50, "y": 30, "position": "CF" }
  }},{
  "4-4-1-1": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 15, "y": 50, "position": "LM" },
    "7": { "x": 37, "y": 55, "position": "CM" },
    "8": { "x": 63, "y": 55, "position": "CM" },
    "9": { "x": 85, "y": 50, "position": "RM" },
    "10": { "x": 50, "y": 37, "position": "CF" },
    "11": { "x": 50, "y": 20, "position": "ST" }
  }},{
  "4-4-2": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 15, "y": 50, "position": "LM" },
    "7": { "x": 37, "y": 50, "position": "CM" },
    "8": { "x": 63, "y": 50, "position": "CM" },
    "9": { "x": 85, "y": 50, "position": "RM" },
    "10": { "x": 30, "y": 25, "position": "ST" },
    "11": { "x": 70, "y": 25, "position": "ST" }
  }},{
  "4-4-2 (B)": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 75, "position": "LB" },
    "3": { "x": 37, "y": 75, "position": "CB" },
    "4": { "x": 63, "y": 75, "position": "CB" },
    "5": { "x": 85, "y": 75, "position": "RB" },
    "6": { "x": 15, "y": 45, "position": "LM" },
    "7": { "x": 37, "y": 55, "position": "CDM" },
    "8": { "x": 63, "y": 55, "position": "CDM" },
    "9": { "x": 85, "y": 45, "position": "RM" },
    "10": { "x": 30, "y": 25, "position": "ST" },
    "11": { "x": 70, "y": 25, "position": "ST" }
  }},{
  "5-2-3": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 60, "position": "LWB" },
    "3": { "x": 28, "y": 75, "position": "CB" },
    "4": { "x": 50, "y": 75, "position": "CB" },
    "5": { "x": 72, "y": 75, "position": "CB" },
    "6": { "x": 85, "y": 60, "position": "RWB" },
    "7": { "x": 37, "y": 50, "position": "CM" },
    "8": { "x": 63, "y": 50, "position": "CM" },
    "9": { "x": 20, "y": 30, "position": "LW" },
    "10": { "x": 50, "y": 20, "position": "ST" },
    "11": { "x": 80, "y": 30, "position": "RW" }
  }},{
  "5-3-2": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 60, "position": "LWB" },
    "3": { "x": 28, "y": 75, "position": "CB" },
    "4": { "x": 50, "y": 75, "position": "CB" },
    "5": { "x": 72, "y": 75, "position": "CB" },
    "6": { "x": 85, "y": 60, "position": "RWB" },
    "7": { "x": 25, "y": 40, "position": "LM" },
    "8": { "x": 50, "y": 53, "position": "CM" },
    "9": { "x": 75, "y": 40, "position": "RM" },
    "10": { "x": 35, "y": 25, "position": "ST" },
    "11": { "x": 65, "y": 25, "position": "ST" }
  }},{
  "5-4-1": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 60, "position": "LWB" },
    "3": { "x": 28, "y": 75, "position": "CB" },
    "4": { "x": 50, "y": 75, "position": "CB" },
    "5": { "x": 72, "y": 75, "position": "CB" },
    "6": { "x": 85, "y": 60, "position": "RWB" },
    "7": { "x": 25, "y": 43, "position": "LM" },
    "8": { "x": 50, "y": 60, "position": "CDM" },
    "9": { "x": 75, "y": 43, "position": "RM" },
    "10": { "x": 50, "y": 35, "position": "CAM" },
    "11": { "x": 50, "y": 20, "position": "ST" }
  }},{
  "5-4-1 (flat)": {
    "1": { "x": 50, "y": 88, "position": "GK" },
    "2": { "x": 15, "y": 60, "position": "LWB" },
    "3": { "x": 28, "y": 75, "position": "CB" },
    "4": { "x": 50, "y": 75, "position": "CB" },
    "5": { "x": 72, "y": 75, "position": "CB" },
    "6": { "x": 85, "y": 60, "position": "RWB" },
    "7": { "x": 15, "y": 45, "position": "LM" },
    "8": { "x": 37, "y": 45, "position": "CM" },
    "9": { "x": 63, "y": 45, "position": "CM" },
    "10": { "x": 85, "y": 45, "position": "RM" },
    "11": { "x": 50, "y": 25, "position": "ST" }
  }}]