
import { common } from './translations/common';
import { navigation } from './translations/navigation';
import { mockExam } from './translations/mockExam';
import { aiTutor } from './translations/aiTutor';
import { dashboard } from './translations/dashboard';
import { dailyRecommendation } from './translations/dailyRecommendation';
import { dailyPlan } from './translations/dailyPlan';
import { videoTutorials } from './translations/videoTutorials';
import { subscription } from './translations/subscription';
import { streak } from './translations/streak';
import { leaderboard } from './translations/leaderboard';
import { notFound } from './translations/notFound';
import { paymentSuccess } from './translations/paymentSuccess';
import { questionBank } from './translations/questionBank';

export const zh = {
  COMMON: common.zh,
  NAVBAR: navigation.zh,
  NAV: navigation.zh,
  DASHBOARD_PAGE: dashboard.zh,
  MOCK_EXAM: mockExam.zh,
  AI_TUTOR: {
    ...aiTutor.zh,
    COMING_SOON: "服务升级中"
  },
  DAILY_RECOMMENDATION: dailyRecommendation.zh,
  DAILY_PLAN: dailyPlan.zh,
  VIDEO_TUTORIALS: videoTutorials.zh,
  SUBSCRIPTION: subscription.zh,
  STREAK: streak.zh,
  LEADERBOARD: leaderboard.zh,
  NOT_FOUND: notFound.zh,
  PAYMENT_SUCCESS: paymentSuccess.zh,
  QUESTION_BANK_PAGE: questionBank.zh
};
