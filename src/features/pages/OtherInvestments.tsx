import React from 'react';
import { Card } from '../components/ui/Card';
import { Building2, Briefcase, Building, Coins, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import clsx from 'clsx';

interface InvestmentOption {
  name: string;
  description: string;
  website: string;
}

interface InvestmentCategory {
  title: string;
  icon: React.ElementType;
  options: InvestmentOption[];
}

const investmentCategories: InvestmentCategory[] = [
  {
    title: "REITs & IT Parks",
    icon: Building2,
    options: [
      {
        name: "Embassy Office Parks REIT",
        description: "India's first publicly listed Real Estate Investment Trust. It owns and operates a portfolio of high-quality office parks and commercial real estate assets across major Indian cities.",
        website: "https://www.embassyofficeparks.com"
      },
      {
        name: "Technopark",
        description: "Major IT park in Thiruvananthapuram offering investment opportunities in the technology sector.",
        website: "https://www.technopark.org"
      },
      {
        name: "Infopark",
        description: "IT park in Kochi providing infrastructure and facilities for IT/ITES companies.",
        website: "https://www.infopark.in"
      },
      {
        name: "Cyberpark",
        description: "Technology park in Kozhikode offering investment opportunities in the IT sector.",
        website: "https://www.cyberparkkerala.org"
      }
    ]
  },
  {
    title: "Investment Platforms",
    icon: Briefcase,
    options: [
      {
        name: "BetterInvest",
        description: "Platform that helps content creators, producers, and media companies access funding for their projects. Connects investors with opportunities in the media and entertainment industry.",
        website: "https://www.betterinvest.club"
      },
      {
        name: "Grip Invest",
        description: "Alternative investment platform offering curated investment opportunities beyond traditional options like stocks and fixed deposits.",
        website: "https://www.gripinvest.in"
      },
      {
        name: "Smallcase",
        description: "Platform offering thematic and strategy-based baskets of stocks, ETFs, and other securities.",
        website: "https://www.smallcase.com"
      }
    ]
  },
  {
    title: "Real Estate Platforms",
    icon: Building,
    options: [
      {
        name: "Strata",
        description: "Offers fractional ownership in Grade-A commercial real estate properties across major Indian cities.",
        website: "https://www.strataprop.com"
      },
      {
        name: "RealX",
        description: "Platform allowing fractional investments in high-yield properties, with a low entry point of just ₹5,000.",
        website: "https://www.realx.in"
      },
      {
        name: "Alt DrX",
        description: "Enables investors to purchase Grade-A real estate on a per-square-foot basis.",
        website: "https://www.altdrx.com"
      }
    ]
  },
  {
    title: "P2P & Alternative Platforms",
    icon: Coins,
    options: [
      {
        name: "Faircent",
        description: "Leading P2P lending platform in India, offering potential returns of up to 12% per annum.",
        website: "https://www.faircent.com"
      },
      {
        name: "LenDenClub",
        description: "Platform allowing retail and institutional lenders to fund personal loans, with potential returns of up to 15% per annum.",
        website: "https://www.lendenclub.com"
      },
      {
        name: "Yieldstreet",
        description: "Provides access to various alternative investments, including real estate, art, and private credit.",
        website: "https://www.yieldstreet.com"
      }
    ]
  },
  {
    title: "Global Investment Options",
    icon: Globe,
    options: [
      {
        name: "Fundrise",
        description: "Known for its low entry point ($10 minimum) and offers electronic real estate funds and venture capital funds.",
        website: "https://fundrise.com"
      },
      {
        name: "CrowdStreet",
        description: "Focuses on commercial real estate investments and is designed for accredited investors.",
        website: "https://www.crowdstreet.com"
      },
      {
        name: "Wint Wealth",
        description: "Platform offering curated fixed-income investments in bonds and FDs, with a low minimum investment.",
        website: "https://www.wintwealth.com"
      }
    ]
  }
];

export function OtherInvestments() {
  const { theme } = useTheme();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Other Investment Options
          </h1>
          <p className="text-secondary">
            Explore alternative investment opportunities across various sectors and platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {investmentCategories.map((category) => (
            <Card key={category.title} className="overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                  <category.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold">{category.title}</h2>
              </div>

              <div className="space-y-4">
                {category.options.map((option) => (
                  <div
                    key={option.name}
                    className="group p-4 rounded-lg transition-all duration-200 hover:bg-hover"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-medium">{option.name}</h3>
                        <a
                          href={option.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={clsx(
                            "text-xs px-3 py-1 rounded-full transition-colors",
                            "bg-gradient-to-r from-blue-600/10 to-purple-600/10",
                            "text-blue-600 hover:from-blue-600 hover:to-purple-600 hover:text-white"
                          )}
                        >
                          Visit Site
                        </a>
                      </div>
                      <p className="text-sm text-secondary">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}