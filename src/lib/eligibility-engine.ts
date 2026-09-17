import {
  StudentProfile,
  EligibilityRuleSet,
  EligibilityCondition,
  EligibilityEvaluationResult,
  EvaluationConditionResult
} from '@/types';

export function evaluateCondition(
  condition: EligibilityCondition,
  student: StudentProfile
): EvaluationConditionResult {
  const { field, operator, value } = condition;
  const studentValue = student[field as keyof StudentProfile];
  let passed = false;
  let explanation = '';

  switch (operator) {
    case '>=':
      passed = Number(studentValue) >= Number(value);
      explanation = passed
        ? `${condition.label} (Your ${field}: ${studentValue} >= required ${value})`
        : `Minimum required ${field} is ${value}, but your recorded value is ${studentValue}.`;
      break;

    case '<=':
      passed = Number(studentValue) <= Number(value);
      explanation = passed
        ? `${condition.label} (Your ${field}: ${studentValue} <= required ${value})`
        : `Maximum allowed ${field} is ${value}, but your recorded value is ${studentValue}.`;
      break;

    case '==':
      passed = String(studentValue).toLowerCase() === String(value).toLowerCase();
      explanation = passed
        ? `${condition.label} (Value matched)`
        : `Required ${field} is ${value}, but yours is ${studentValue}.`;
      break;

    case '!=':
      passed = String(studentValue).toLowerCase() !== String(value).toLowerCase();
      explanation = passed ? `${condition.label}` : `Value matches excluded criteria (${value}).`;
      break;

    case 'IN':
      if (Array.isArray(value)) {
        passed = value.map(String).includes(String(studentValue));
      } else {
        passed = String(value).split(',').map((s) => s.trim()).includes(String(studentValue));
      }
      explanation = passed
        ? `${condition.label} (Your ${field} '${studentValue}' is eligible)`
        : `Your ${field} (${studentValue}) is not among the eligible options: [${Array.isArray(value) ? value.join(', ') : value}].`;
      break;

    case 'IS_TRUE':
      passed = Boolean(studentValue) === true;
      explanation = passed
        ? `${condition.label} (Confirmed)`
        : `Requirement '${condition.label}' is not met.`;
      break;

    default:
      passed = false;
      explanation = `Condition operator ${operator} unknown.`;
  }

  return {
    condition,
    passed,
    studentValue,
    explanation
  };
}

export function evaluateEligibility(
  ruleSet: EligibilityRuleSet,
  student: StudentProfile
): EligibilityEvaluationResult {
  if (!ruleSet || !ruleSet.conditions || ruleSet.conditions.length === 0) {
    return {
      state: 'GREEN',
      passed: true,
      scoreLabel: 'Likely Eligible',
      disclaimer: 'You appear eligible based on the configured institutional criteria. Final approval is subject to institutional verification.',
      summaryReason: 'No specific restricting eligibility conditions configured for this opportunity.',
      conditionResults: [],
      nextSteps: [
        'Review required document checklist',
        'Submit student application',
        'Department verification'
      ]
    };
  }

  const results = ruleSet.conditions.map((c) => evaluateCondition(c, student));
  const passedCount = results.filter((r) => r.passed).length;
  const totalCount = results.length;

  let passed = false;
  if (ruleSet.matchType === 'ALL') {
    passed = passedCount === totalCount;
  } else {
    passed = passedCount > 0;
  }

  let state: 'GREEN' | 'YELLOW' | 'RED' = 'RED';
  let scoreLabel = 'Currently Not Eligible';
  let summaryReason = '';

  if (passed) {
    state = 'GREEN';
    scoreLabel = 'Likely Eligible';
    summaryReason = `Based on your profile, you meet all ${totalCount} configured criteria for this opportunity.`;
  } else if (passedCount > 0) {
    state = 'YELLOW';
    scoreLabel = 'Eligibility Requires Verification';
    summaryReason = `You meet ${passedCount} out of ${totalCount} criteria. Institutional verification is required.`;
  } else {
    state = 'RED';
    scoreLabel = 'Currently Not Eligible';
    summaryReason = `Your current profile does not meet the configured academic/achievement criteria.`;
  }

  return {
    state,
    passed,
    scoreLabel,
    disclaimer: 'You appear eligible based on the configured institutional criteria. Final approval is subject to institutional verification.',
    summaryReason,
    conditionResults: results,
    nextSteps: passed
      ? [
          'Prepare your official documents',
          'Complete and submit your application form',
          'Faculty and department review',
          'Final approval and disbursement'
        ]
      : [
          'Review the missing criteria listed below',
          'Contact the responsible department for policy clarifications if applicable',
          'Update your student profile if academic details have changed'
        ]
  };
}
