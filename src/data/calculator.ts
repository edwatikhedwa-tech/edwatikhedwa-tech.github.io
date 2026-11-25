export type DesignationType = 'word' | 'figurative' | 'combined';
export type ReviewSpeed = 'standard' | 'accelerated';
export type CertificateFormat = 'electronic' | 'paper';

export interface CalculatorInput {
  designationType: DesignationType;
  classesCount: number;
  extraItemsCount: number;
  speed: ReviewSpeed;
  certificateFormat: CertificateFormat;
  bureauStandardPrice?: number;
  bureauAcceleratedPrice?: number;
}

export interface CalculatorResult {
  stage1Fee: number;
  stage2Fee: number;
  totalStateFee: number;
  fipsAccelerationFee: number;
  bureauFee: number;
  grandTotal: number;
}

/**
 * Расчёт государственных пошлин Роспатента (ПП РФ от 23.09.2025 № 1459)
 * и платных услуг ФИПС (Приказ № 107 от 27.02.2026, НДС 22%).
 */
export function calculateTrademarkBudget(input: CalculatorInput): CalculatorResult {
  const classes = Math.max(1, Math.min(45, Math.floor(input.classesCount || 1)));
  const extraItems = Math.max(0, Math.min(100, Math.floor(input.extraItemsCount || 0)));

  // Этап 1 (подача + экспертиза, п. 2.1 + п. 2.4): 17 000 + 3 500*(классы - 1) + 500*позиции_сверх_10
  const stage1Fee = 17000 + 3500 * (classes - 1) + 500 * extraItems;

  // Этап 2 (регистрация + свидетельство, п. 2.11 + п. 2.14): 18 000 + 2 000*max(0, классы - 5) + (3 000 бумажное)
  const paperFee = input.certificateFormat === 'paper' ? 3000 : 0;
  const stage2Fee = 18000 + 2000 * Math.max(0, classes - 5) + paperFee;

  const totalStateFee = stage1Fee + stage2Fee;

  // Тариф ФИПС за ускоренный 10-дневный поиск по 45 классам (вкл. НДС 22%)
  let fipsAccelerationFee = 0;
  if (input.speed === 'accelerated') {
    fipsAccelerationFee = input.designationType === 'combined' ? 208000 : 104000;
  }

  const bureauStandard = input.bureauStandardPrice ?? 39900;
  const bureauAccelerated = input.bureauAcceleratedPrice ?? 46000;
  const bureauFee = input.speed === 'accelerated' ? bureauAccelerated : bureauStandard;

  const grandTotal = totalStateFee + fipsAccelerationFee + bureauFee;

  return {
    stage1Fee,
    stage2Fee,
    totalStateFee,
    fipsAccelerationFee,
    bureauFee,
    grandTotal,
  };
}

export function formatRub(amount: number): string {
  return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽';
}
