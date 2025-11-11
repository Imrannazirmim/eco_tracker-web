import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { RiRecycleLine } from "react-icons/ri";

export default function Footer() {
      return (
            <footer className="bg-white text-black">
                  <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                              {/* Brand Section */}
                              <div>
                                    <div className="flex items-center gap-2 mb-4">
                                          <RiRecycleLine className="text-4xl" />
                                          <h3 className="text-2xl font-bold">EcoTrack</h3>
                                    </div>
                                    <p className="text-green-500 leading-relaxed">
                                          Join our community to make a positive impact on the planet through shared
                                          challenges and tips.
                                    </p>
                              </div>

                              {/* Quick Links */}
                              <div>
                                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-3">
                                                <Link
                                                      to="/challenges"
                                                      className="block text-green-500 hover:text-white transition-colors"
                                                >
                                                      Challenges
                                                </Link>
                                                <Link
                                                      to="/events"
                                                      className="block text-green-500 hover:text-white transition-colors"
                                                >
                                                      Events
                                                </Link>
                                                <Link
                                                      to="/eco-tips"
                                                      className="block text-green-500 hover:text-white transition-colors"
                                                >
                                                      Eco Tips
                                                </Link>
                                          </div>
                                          <div className="space-y-3">
                                                <Link
                                                      to="/about"
                                                      className="block text-green-500 hover:text-white transition-colors"
                                                >
                                                      About Us
                                                </Link>
                                                <Link
                                                      to="/careers"
                                                      className="block text-green-500 hover:text-white transition-colors"
                                                >
                                                      Careers
                                                </Link>
                                                <Link
                                                      to="/contact"
                                                      className="block text-green-500 hover:text-white transition-colors"
                                                >
                                                      Contact
                                                </Link>
                                          </div>
                                    </div>
                              </div>

                              {/* Social Media */}
                              <div>
                                    <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                                    <div className="flex gap-4">
                                          <a
                                                href="https://facebook.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                                                aria-label="Facebook"
                                          >
                                                <FaFacebookF className="text-xl" />
                                          </a>
                                          <a
                                                href="https://twitter.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                                                aria-label="Twitter"
                                          >
                                                <FaTwitter className="text-xl" />
                                          </a>
                                          <a
                                                href="https://instagram.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                                                aria-label="Instagram"
                                          >
                                                <FaInstagram className="text-xl" />
                                          </a>
                                    </div>
                              </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-green-400/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                              <p className="text-green-500 text-sm">© 2024 EcoTrack. All rights reserved.</p>
                              <div className="flex gap-6">
                                    <Link
                                          to="/privacy"
                                          className="text-green-500 hover:text-white text-sm transition-colors"
                                    >
                                          Privacy Policy
                                    </Link>
                                    <Link
                                          to="/terms"
                                          className="text-green-500 hover:text-white text-sm transition-colors"
                                    >
                                          Terms of Service
                                    </Link>
                              </div>
                        </div>
                  </div>
            </footer>
      );
}
