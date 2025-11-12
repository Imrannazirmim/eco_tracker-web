import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { RiRecycleLine } from "react-icons/ri";
import {Leaf, Facebook, Twitter, Instagram, Youtube} from 'lucide-react'

export default function Footer() {
      return (
            <footer className="bg-gray-900 text-white py-12">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                              {/* Brand */}
                              <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                                                <Leaf className="w-5 h-5 text-white" />
                                          </div>
                                          <span className="text-xl font-bold">EcoTrack</span>
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                          Making sustainability accessible and actionable for everyone.
                                    </p>
                              </div>

                              {/* Explore */}
                              <div>
                                    <h3 className="font-semibold mb-4">Explore</h3>
                                    <ul className="space-y-2 text-gray-400 text-sm">
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Challenges
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Events
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Tips
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Community
                                                </a>
                                          </li>
                                    </ul>
                              </div>

                              {/* About */}
                              <div>
                                    <h3 className="font-semibold mb-4">About</h3>
                                    <ul className="space-y-2 text-gray-400 text-sm">
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Our Mission
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Team
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Partnerships
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Careers
                                                </a>
                                          </li>
                                    </ul>
                              </div>

                              {/* Legal */}
                              <div>
                                    <h3 className="font-semibold mb-4">Legal</h3>
                                    <ul className="space-y-2 text-gray-400 text-sm">
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Privacy Policy
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Terms of Service
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Cookie Policy
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white">
                                                      Contact
                                                </a>
                                          </li>
                                    </ul>
                              </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                                    © 2024 EcoTrack. All rights reserved.
                              </p>
                              <div className="flex space-x-6">
                                    <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                                    <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                                    <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                                    <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                              </div>
                        </div>
                  </div>
            </footer>
      );
}
