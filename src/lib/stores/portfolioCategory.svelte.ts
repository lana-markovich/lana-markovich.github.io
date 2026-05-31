export const portfolioCategory = $state<{ value: string | null }>({ value: null });

export function setPortfolioCategory(next: string | null): void {
	portfolioCategory.value = next;
}
