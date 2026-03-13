export const JD_TO_USD_RATE = 1.41
export const convertJDtoUSD = (jdAmount: number): number => Math.round(jdAmount * JD_TO_USD_RATE * 100) / 100
export const formatJD = (amount: number, language: string = 'en'): string => {
  const formatted = amount.toLocaleString(language === 'ar' ? 'ar-JO' : 'en-US', { minimumFractionDigits: 2 })
  return language === 'ar' ? `${formatted} د.أ` : `${formatted} JD`
}
export const formatUSD = (amount: number): string => `$${amount.toFixed(2)}`
export const getCurrencyConversionInfo = (jdAmount: number, language: string = 'en') => ({
  jdAmount,
  usdAmount: convertJDtoUSD(jdAmount),
  jdFormatted: formatJD(jdAmount, language),
  usdFormatted: formatUSD(convertJDtoUSD(jdAmount)),
  exchangeRate: JD_TO_USD_RATE
})