import React from 'react';
import { TrendingUp, Mail, Phone, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-background border-t border-border/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Investo AI
              </span>
            </div>
            <p className="text-muted-foreground">
              Revolutionizing investment management with artificial intelligence.
            </p>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Approach
                </a>
              </li>
              <li>
                <a href="#key-features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-5 w-5 mr-2" />
                <span>support@investoai.com</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Investo AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}