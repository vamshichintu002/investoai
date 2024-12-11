import { InvestmentData } from '../types/investment';

const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export async function getDefaultInvestmentData(clerkId: string): Promise<InvestmentData> {
  try {
    console.log('Fetching investment data for user:', clerkId);
    const response = await fetch(`${apiUrl}/api/investment/${clerkId}`);
    console.log('API response status:', response.status);
    
    if (response.status === 404) {
      console.log('No existing investment data found for new user');
      return fallbackDefaultInvestmentData;
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API data received:', data);
    
    if (!data) {
      console.log('No data received, using fallback data');
      return fallbackDefaultInvestmentData;
    }
    
    return data as InvestmentData;
  } catch (error) {
    console.error('Error fetching investment data:', error);
    return fallbackDefaultInvestmentData; // Return fallback data instead of throwing
  }
}

// Fallback static data in case the fetch fails
export const fallbackDefaultInvestmentData: InvestmentData = {
  "disclaimer": "This recommendation is based on current market conditions and your profile. Past performance is not indicative of future results. Please consult with a financial advisor before making investment decisions.",
  "explanation": "Based on your low risk profile and current market conditions, we have prepared a personalized investment portfolio recommendation. The allocation considers your investment horizon of short and comfort with fluctuations level of 10.\n\nMarket Analysis:\n\nStocks:\n• Current Trend: Mixed trend with recent volatility, influenced by global and domestic factors\n• Outlook: Bullish sentiment with potential for recovery, driven by broader indices' performance and sectoral gains\n\nMutual_Funds:\n• Current Trend: India's mutual fund industry is booming, with assets reaching an all-time high of 66.7 trillion rupees ($794 billion) as of August-end 2024. Equity mutual funds have seen significant inflows, driven by the 15.5% rise in India's benchmark equity indexes.\n• Outlook: The mutual fund industry is expected to continue its growth trajectory, driven by thematic and sectoral funds which captured 45% of total inflows. However, investors should remain cautious due to general market risks and specific security risks.\n\nBonds:\n• Current Trend: The Indian bond market is experiencing a robust year with several major milestones, including the inclusion of Indian bonds in global indexes and an upgrade in India's credit rating outlook. The market is attracting foreign investors, with significant investments in Indian bonds despite outflows from Indian equities.\n• Outlook: The outlook for the Indian bond market is positive, driven by the country's expanding economy and improving investor sentiment. However, there are concerns about the slowing domestic economy and the potential need for monetary policy adjustments.\n\nGold:\n• Current Trend: Gold prices are experiencing a strong run, driven by geopolitical tensions, anticipated interest rate cuts, and persistent inflation.\n• Outlook: Gold is well-positioned to continue its strong performance in 2024, with potential for further growth driven by central bank demand, robust physical demand from Asia, and renewed Western investment.\n\nAllocation Strategy:\n\n• Stocks (35.0%): Recommended allocation for stocks\n\n• Mutual_Funds (30.0%): Recommended allocation for mutual funds\n\n• Bonds (25.0%): Recommended allocation for bonds\n\n• Gold (10.0%): Recommended allocation for gold\n\nRisk Considerations:\n\n• Stocks Risks: Persistent FII selling, Subdued quarterly results, Negative trends in US and Asian markets, Domestic inflation concerns\n\n• Mutual_Funds Risks: General Market Risk, Security Specific Risk, Liquidity Risk, Inflation Risk, Loan Financing Risk, Risk of Non-Compliance, Manager's Risk\n\n• Bonds Risks: Slowing economic growth, Potential rate cuts by RBI, Inflation trajectory, Credit risk perceptions\n\n• Gold Risks: Company-specific risks in gold mining stocks, High risk associated with gold futures and options, Platform risk in digital gold platforms",
  "market_analysis": {
    "Gold": {
      "risks": [
        "Company-specific risks in gold mining stocks",
        "High risk associated with gold futures and options",
        "Platform risk in digital gold platforms"
      ],
      "outlook": "Gold is well-positioned to continue its strong performance in 2024, with potential for further growth driven by central bank demand, robust physical demand from Asia, and renewed Western investment.",
      "key_factors": [
        "Geopolitical tensions",
        "Anticipated interest rate cuts",
        "Persistent inflation",
        "Central bank demand",
        "Robust physical demand from Asia",
        "Resurgent Western investment"
      ],
      "current_trend": "Gold prices are experiencing a strong run, driven by geopolitical tensions, anticipated interest rate cuts, and persistent inflation.",
      "specific_suggestions": [
        {
          "name": "Investing in Gold Mining Stocks",
          "ticker": "Example: Barrick Gold (ABX) or Newmont Goldcorp (NEM)",
          "rationale": "Potential for dividends and leveraged exposure to gold prices, but also company-specific risks."
        },
        {
          "name": "Gold Futures and Options",
          "ticker": "Example: Gold futures contracts or options on futures",
          "rationale": "Potential for high returns and leverage, but high risk and requires significant market knowledge."
        },
        {
          "name": "Digital Gold",
          "ticker": "Example: Digital gold platforms like APMEX or JM Bullion",
          "rationale": "Convenience, fractional ownership, and no need for physical storage, but also platform risk and fees."
        }
      ]
    },
    "Bonds": {
      "risks": [
        "Slowing economic growth",
        "Potential rate cuts by RBI",
        "Inflation trajectory",
        "Credit risk perceptions"
      ],
      "outlook": "The outlook for the Indian bond market is positive, driven by the country's expanding economy and improving investor sentiment. However, there are concerns about the slowing domestic economy and the potential need for monetary policy adjustments.",
      "key_factors": [
        "Inclusion of Indian bonds in global indexes",
        "Upgrade in India's credit rating outlook",
        "Foreign investor interest",
        "Slowing domestic economy",
        "Monetary policy adjustments"
      ],
      "current_trend": "The Indian bond market is experiencing a robust year with several major milestones, including the inclusion of Indian bonds in global indexes and an upgrade in India's credit rating outlook. The market is attracting foreign investors, with significant investments in Indian bonds despite outflows from Indian equities.",
      "specific_suggestions": [
        {
          "name": "Indian Government Bond",
          "ticker": "IGB",
          "rationale": "Recommended due to stable yields and inclusion in global indexes, providing a reliable investment option with a yield of approximately 6.79% for the 10-year maturity."
        },
        {
          "name": "Corporate Bond Issuances",
          "ticker": "varies",
          "rationale": "Recommended for corporate bonds due to their steady trading volumes and occasional fluctuations, offering a preferred route for Indian companies to raise funds with record issuances of Rs 8.6 lakh crore in FY24."
        }
      ]
    },
    "Stocks": {
      "risks": [
        "Persistent FII selling",
        "Subdued quarterly results",
        "Negative trends in US and Asian markets",
        "Domestic inflation concerns"
      ],
      "outlook": "Bullish sentiment with potential for recovery, driven by broader indices' performance and sectoral gains",
      "key_factors": [
        "Global market trends",
        "Domestic inflation",
        "Corporate earnings",
        "Foreign fund flows",
        "Sectoral performance"
      ],
      "current_trend": "Mixed trend with recent volatility, influenced by global and domestic factors",
      "specific_suggestions": [
        {
          "name": "Zomato",
          "ticker": "ZOMATO.NS",
          "rationale": "Expected to perform better during the week due to improving consumer demand."
        },
        {
          "name": "Dixon",
          "ticker": "DIXON.NS",
          "rationale": "Strong performance in the consumer electronics sector."
        },
        {
          "name": "Wipro",
          "ticker": "WIPRO.NS",
          "rationale": "Positive outlook in the IT sector driven by global demand."
        },
        {
          "name": "HDFC Bank",
          "ticker": "HDFCBANK.NS",
          "rationale": "Recovery expected in the banking sector post recent corrections."
        },
        {
          "name": "L&T",
          "ticker": "LTI.NS",
          "rationale": "Strong fundamentals in the engineering and construction sector."
        },
        {
          "name": "Federal Bank",
          "ticker": "FEDERALBNK.NS",
          "rationale": "Potential for growth in the banking sector with improving economic conditions."
        },
        {
          "name": "Max Healthcare",
          "ticker": "MAXHEALTH.NS",
          "rationale": "Positive outlook in the healthcare sector driven by increasing demand."
        },
        {
          "name": "Divi’s Lab",
          "ticker": "DIVISLAB.NS",
          "rationale": "Strong performance in the pharmaceutical sector."
        },
        {
          "name": "Ultra Cemco",
          "ticker": "ULTRACEMCO.NS",
          "rationale": "Potential for growth in the cement sector with infrastructure projects."
        },
        {
          "name": "Oberoi Realty",
          "ticker": "OBEROIRLTY.NS",
          "rationale": "Positive outlook in the real estate sector with government reforms."
        }
      ]
    },
    "Mutual_Funds": {
      "risks": [
        "General Market Risk",
        "Security Specific Risk",
        "Liquidity Risk",
        "Inflation Risk",
        "Loan Financing Risk",
        "Risk of Non-Compliance",
        "Manager's Risk"
      ],
      "outlook": "The mutual fund industry is expected to continue its growth trajectory, driven by thematic and sectoral funds which captured 45% of total inflows. However, investors should remain cautious due to general market risks and specific security risks.",
      "key_factors": [
        "High asset growth",
        "Significant equity mutual fund inflows",
        "Thematic and sectoral fund performance",
        "Benchmark equity index rise"
      ],
      "current_trend": "India's mutual fund industry is booming, with assets reaching an all-time high of 66.7 trillion rupees ($794 billion) as of August-end 2024. Equity mutual funds have seen significant inflows, driven by the 15.5% rise in India's benchmark equity indexes.",
      "specific_suggestions": [
        {
          "name": "Motilal Oswal Midcap Fund - Direct Plan - Growth",
          "ticker": "MOTMF",
          "rationale": "High returns with a 32.06% 1-year return and 39.14% 3-year return, making it an attractive option for moderate to high-risk investors."
        },
        {
          "name": "Invesco India Large & Mid Cap Fund - Growth",
          "ticker": "IILMF",
          "rationale": "Consistent performance with a 18.37% 1-year return and 42.65% 3-year return, suitable for diversified portfolios."
        },
        {
          "name": "HSBC Equity Savings Fund",
          "ticker": "HESF",
          "rationale": "Moderate risk with a 24.6% 1-year return, ideal for those seeking balanced returns in a hybrid fund."
        }
      ]
    }
  },
  "recommendations": [
    {
      "details": "Recommended allocation for stocks",
      "exit_strategy": "Set target prices and trailing stop losses",
      "entry_strategy": "Use dollar-cost averaging to enter positions gradually",
      "investment_type": "Stocks",
      "risk_mitigation": "Diversification across sectors and market caps",
      "specific_suggestions": [
        {
          "name": "Zomato",
          "ticker": "ZOMATO.NS",
          "rationale": "Expected to perform better during the week due to improving consumer demand."
        },
        {
          "name": "Dixon",
          "ticker": "DIXON.NS",
          "rationale": "Strong performance in the consumer electronics sector."
        },
        {
          "name": "Wipro",
          "ticker": "WIPRO.NS",
          "rationale": "Positive outlook in the IT sector driven by global demand."
        },
        {
          "name": "HDFC Bank",
          "ticker": "HDFCBANK.NS",
          "rationale": "Recovery expected in the banking sector post recent corrections."
        },
        {
          "name": "L&T",
          "ticker": "LTI.NS",
          "rationale": "Strong fundamentals in the engineering and construction sector."
        },
        {
          "name": "Federal Bank",
          "ticker": "FEDERALBNK.NS",
          "rationale": "Potential for growth in the banking sector with improving economic conditions."
        },
        {
          "name": "Max Healthcare",
          "ticker": "MAXHEALTH.NS",
          "rationale": "Positive outlook in the healthcare sector driven by increasing demand."
        },
        {
          "name": "Divi’s Lab",
          "ticker": "DIVISLAB.NS",
          "rationale": "Strong performance in the pharmaceutical sector."
        },
        {
          "name": "Ultra Cemco",
          "ticker": "ULTRACEMCO.NS",
          "rationale": "Potential for growth in the cement sector with infrastructure projects."
        },
        {
          "name": "Oberoi Realty",
          "ticker": "OBEROIRLTY.NS",
          "rationale": "Positive outlook in the real estate sector with government reforms."
        }
      ],
      "allocation_percentage": 35
    },
    {
      "details": "Recommended allocation for mutual funds",
      "exit_strategy": "Review and rebalance quarterly",
      "entry_strategy": "Systematic investment plan (SIP) for regular investments",
      "investment_type": "Mutual_Funds",
      "risk_mitigation": "Mix of different fund types and investment styles",
      "specific_suggestions": [
        {
          "name": "Motilal Oswal Midcap Fund - Direct Plan - Growth",
          "ticker": "MOTMF",
          "rationale": "High returns with a 32.06% 1-year return and 39.14% 3-year return, making it an attractive option for moderate to high-risk investors."
        },
        {
          "name": "Invesco India Large & Mid Cap Fund - Growth",
          "ticker": "IILMF",
          "rationale": "Consistent performance with a 18.37% 1-year return and 42.65% 3-year return, suitable for diversified portfolios."
        },
        {
          "name": "HSBC Equity Savings Fund",
          "ticker": "HESF",
          "rationale": "Moderate risk with a 24.6% 1-year return, ideal for those seeking balanced returns in a hybrid fund."
        }
      ],
      "allocation_percentage": 30
    },
    {
      "details": "Recommended allocation for bonds",
      "exit_strategy": "Hold till maturity unless significant market changes",
      "entry_strategy": "Ladder strategy with staggered maturity dates",
      "investment_type": "Bonds",
      "risk_mitigation": "Diversify across different issuers and maturities",
      "specific_suggestions": [
        {
          "name": "Indian Government Bond",
          "ticker": "IGB",
          "rationale": "Recommended due to stable yields and inclusion in global indexes, providing a reliable investment option with a yield of approximately 6.79% for the 10-year maturity."
        },
        {
          "name": "Corporate Bond Issuances",
          "ticker": "varies",
          "rationale": "Recommended for corporate bonds due to their steady trading volumes and occasional fluctuations, offering a preferred route for Indian companies to raise funds with record issuances of Rs 8.6 lakh crore in FY24."
        }
      ],
      "allocation_percentage": 25
    },
    {
      "details": "Recommended allocation for gold",
      "exit_strategy": "Maintain as long-term hedge, sell partial positions at significant highs",
      "entry_strategy": "Regular small purchases to average out price fluctuations",
      "investment_type": "Gold",
      "risk_mitigation": "Maintain as portfolio hedge, limit exposure to 5-15%",
      "specific_suggestions": [
        {
          "name": "Investing in Gold Mining Stocks",
          "ticker": "Example: Barrick Gold (ABX) or Newmont Goldcorp (NEM)",
          "rationale": "Potential for dividends and leveraged exposure to gold prices, but also company-specific risks."
        },
        {
          "name": "Gold Futures and Options",
          "ticker": "Example: Gold futures contracts or options on futures",
          "rationale": "Potential for high returns and leverage, but high risk and requires significant market knowledge."
        },
        {
          "name": "Digital Gold",
          "ticker": "Example: Digital gold platforms like APMEX or JM Bullion",
          "rationale": "Convenience, fractional ownership, and no need for physical storage, but also platform risk and fees."
        }
      ],
      "allocation_percentage": 10
    }
  ],
  "review_schedule": "Semi-annually"
}
