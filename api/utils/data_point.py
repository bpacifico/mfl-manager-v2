from datetime import datetime, timedelta
from collections import defaultdict


def fill_missing_intervals(data, interval, property):
    # Format strings for different intervals
    formats = {
        'h': '%Y-%m-%d %H:00',
        'd': '%Y-%m-%d',
        'w': '%Y-%W',
        'm': '%Y-%m'
    }
    
    if interval not in formats:
        raise ValueError("Invalid interval. Choose 'h', 'd', 'w', or 'm'.")
    
    # Parse the dates in the data
    parsed_data = {datetime.strptime(entry['date'], formats[interval]): entry['value'] for entry in data if entry['property'] == property}
    
    # Find the range of dates
    start_time = min(parsed_data.keys())
    end_time = max(parsed_data.keys())
    
    # Generate all intervals in the range
    current_time = start_time
    filled_data = []

    while current_time <= end_time:
        if current_time in parsed_data:
            filled_data.append({"property": property, "date": current_time.strftime(formats[interval]), "value": parsed_data[current_time]})
        else:
            filled_data.append({"property": property, "date": current_time.strftime(formats[interval]), "value": 0})
        
        if interval == 'h':
            current_time += timedelta(hours=1)
        elif interval == 'd':
            current_time += timedelta(days=1)
        elif interval == 'w':
            current_time += timedelta(weeks=1)
        elif interval == 'm':
            next_month = current_time.month + 1
            next_year = current_time.year + (next_month // 13)
            next_month = next_month % 12 or 12
            current_time = current_time.replace(year=next_year, month=next_month, day=1)
    
    return filled_data