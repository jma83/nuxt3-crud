const constants: {
  MIN_TASK_CHARS: number;
  MAX_TASK_CHARS: number;
  REGEX_TASK: RegExp;
} = {
  MIN_TASK_CHARS: 2,
  MAX_TASK_CHARS: 30,
  REGEX_TASK: /^[a-zA-Z0-9',.\s]{2,30}$/gm
};

export default constants;
