// for wrapping API responses
export interface ISetResponse {
  statusCode: number;
  statusMessage: string;
  data?: any;
  cause?: any;
}

export interface IAppData {
  updated: string;
  data: {
    element_types: IElementType[]
    elements: IPlayer[];
    teams: ITeam[];
  };
}

export interface IDashboardData {
  highest_points: IPlayer[];
  expected_goals_90: IPlayer[];
  expected_assists_90: IPlayer[];
}

export interface IElementType {
  element_count: number,
  id: number,
  plural_name: string,
  plural_name_short: string,
  singular_name: string,
  singular_name_short: string,
}

export interface IPlayer {
  assists: number;
  bonus: number;
  bps: number;
  chance_of_playing_next_round: number;
  chance_of_playing_this_round: number;
  clean_sheets: number;
  clean_sheets_per_90: number;
  code: number;
  corners_and_indirect_freekicks_order: number;
  corners_and_indirect_freekicks_text: string;
  cost_change_event: number;
  cost_change_event_fall: number;
  cost_change_start: number;
  cost_change_start_fall: number;
  creativity: string;
  creativity_rank: number;
  creativity_rank_type: number;
  direct_freekicks_order: number;
  direct_freekicks_text: string;
  dreamteam_count: number;
  element_type: number;
  ep_next: string;
  ep_this: string;
  event_points: number;
  expected_assists: string;
  expected_assists_per_90: number;
  expected_goal_involvements: string;
  expected_goal_involvements_per_90: number;
  expected_goals: string;
  expected_goals_conceded: string;
  expected_goals_conceded_per_90: number;
  expected_goals_per_90: number;
  first_name: string;
  form: string;
  form_rank: number;
  form_rank_type: number;
  goals_conceded: number;
  goals_conceded_per_90: number;
  goals_scored: number;
  ict_index: string;
  ict_index_rank: number;
  ict_index_rank_type: number;
  in_dreamteam: boolean;
  influence: string;
  influence_rank: number;
  influence_rank_type: number;
  minutes: number;
  news: string;
  news_added: Date;
  now_cost: number;
  now_cost_rank: number;
  now_cost_rank_type: number;
  own_goals: number;
  penalties_missed: number;
  penalties_order: number;
  penalties_saved: number;
  penalties_text: string;
  photo: string;
  points_per_game: string;
  points_per_game_rank: number;
  points_per_game_rank_type: number;
  red_cards: number;
  saves: number;
  saves_per_90: number;
  second_name: string;
  selected_by_percent: string;
  selected_rank: number;
  selected_rank_type: number;
  special: boolean;
  squad_number: number;
  starts: number;
  starts_per_90: number;
  status: string;
  team: number | { name: string, short_name: string };
  team_code: number;
  threat: string;
  threat_rank: number;
  threat_rank_type: number;
  total_points: number;
  transfers_in: number;
  transfers_in_event: number;
  transfers_out: number;
  transfers_out_event: number;
  updated_time: {
    $date: Date;
  };
  value_form: string;
  value_season: string;
  web_name: string;
  yellow_cards: number;
}

export interface ITeam {
  id: number,
  code: number;
  draw: number;
  form: string;
  loss: number;
  name: string;
  played: number;
  points: number;
  position: number;
  pulse_id: number;
  short_name: string;
  strength: number;
  strength_attack_away: number;
  strength_attack_home: number;
  strength_defence_away: number;
  strength_defence_home: number;
  strength_overall_away: number;
  strength_overall_home: number;
  team_division: string;
  unavailable: boolean;
  updated_time: {
    $date: Date;
  };
  win: number;
}
