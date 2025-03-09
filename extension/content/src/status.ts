export const status = {
  PLANNED: "planned",
  WATCHING: "watching",
  REWATCHING: "rewatching",
  COMPLETED: "completed",
  ON_HOLD: "on_hold",
  DROPPED: "dropped",
} as const;

export const statusText = {
  [status.PLANNED]: "Запланировано",
  [status.WATCHING]: "Смотрю",
  [status.REWATCHING]: "Пересматриваю",
  [status.COMPLETED]: "Просмотрено",
  [status.ON_HOLD]: "Отложено",
  [status.DROPPED]: "Брошено",
};
