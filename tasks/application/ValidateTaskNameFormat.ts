import constants from "~/utils/constants";
import type TaskValidationResponseData from "~/tasks/domain/TaskValidationResponseData";

const minChars: number = constants.MIN_TASK_CHARS;
const maxChars: number = constants.MAX_TASK_CHARS;
const regexTask: RegExp = constants.REGEX_TASK;

interface ValidationTaskNameStrategy {
  isValid(taskName: string): boolean;
  getError(): string;
}

export class ValidationTaskNameEmptyStrategy implements ValidationTaskNameStrategy {
  isValid(taskName: string): boolean {
    return taskName != null && taskName.length > 0;
  }
  getError(): string {
    return "Text can't be empty";
  }
}

export class ValidationTaskNameMinStrategy implements ValidationTaskNameStrategy {
  isValid(taskName: string): boolean {
    return taskName.length >= minChars;
  }
  getError(): string {
    return `The text must be at least ${minChars} characters`;
  }
}

export class ValidationTaskNameMaxStrategy implements ValidationTaskNameStrategy {
  isValid(taskName: string): boolean {
    return taskName.length <= maxChars;
  }
  getError(): string {
    return `The text must be a maximum of ${maxChars} characters`;
  }
}

export class ValidationTaskNameRegexStrategy implements ValidationTaskNameStrategy {
  isValid(taskName: string): boolean {
    const regex = new RegExp(regexTask);
    return regex.test(taskName);
  }
  getError(): string {
    return `The text must be between ${minChars} and ${maxChars} alphanumeric characters`;
  }
}

export default class ValidateTaskNameFormat {
  public execute(taskName: string): TaskValidationResponseData {
    const strategies: ValidationTaskNameStrategy[] = [
      new ValidationTaskNameEmptyStrategy(),
      new ValidationTaskNameMinStrategy(),
      new ValidationTaskNameMaxStrategy(),
      new ValidationTaskNameRegexStrategy(),
    ];

    const strategy: ValidationTaskNameStrategy | undefined = strategies.find(
      (strategy: ValidationTaskNameStrategy) => !strategy.isValid(taskName),
    );

    if (strategy !== undefined) {
      return { isValid: false, error: strategy.getError() };
    }
    return { isValid: true };
  }
}
