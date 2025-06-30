type AnalyticsEvent = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

export const trackEvent = ({ category, action, label, value }: AnalyticsEvent): void => {
  // In a real app, this would send data to an analytics service
  console.log('Analytics Event:', { category, action, label, value });
};