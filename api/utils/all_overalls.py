# all_overalls.py

from utils.player import positions, familiarity, get_calculated_overall, get_malus

def calculate_overall_list(data, positions):
    """
    Calcule les overall ratings pour toutes les combinaisons de joueurs et de positions.
    
    Args:
        data: Liste des joueurs avec leurs métadonnées
        positions: Liste des positions disponibles
    
    Returns:
        Une liste de dictionnaires contenant les overall ratings calculés
    """
    result = []
    
    # Parcourir tous les éléments de 'data'
    for player in data:
        # Parcourir tous les éléments de 'positions' pour chaque élément de 'data'
        for position in positions:
            # Appliquer get_calculated_overall à chaque combinaison (player, position)
            calculated_value = get_calculated_overall(player["metadata"], position["name"])
            malus_position = get_malus(player["metadata"], position["name"])
            
            if calculated_value is not None and calculated_value > 0:
                result.append({
                    "overall": calculated_value,
                    "lastName": player["metadata"]["lastName"],
                    "position": position["name"],
                    "metadata": player["metadata"],
                    "malus": malus_position
                })
    
    return result