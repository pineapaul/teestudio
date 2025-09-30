"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Camera, Instagram, Mail, Phone, MapPin, Star, ChevronRight, Play, Sparkles, Zap, Eye, Palette } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const samplePhotos = [
  { id: 1, src: "https://picsum.photos/800/600?random=1", alt: "Portrait Photography", category: "Portraits" },
  { id: 2, src: "https://picsum.photos/800/600?random=2", alt: "Wedding Photography", category: "Weddings" },
  { id: 3, src: "https://picsum.photos/800/600?random=3", alt: "Event Photography", category: "Events" },
  { id: 4, src: "https://picsum.photos/800/600?random=4", alt: "Fashion Photography", category: "Fashion" },
  { id: 5, src: "https://picsum.photos/800/600?random=5", alt: "Corporate Photography", category: "Corporate" },
  { id: 6, src: "https://picsum.photos/800/600?random=6", alt: "Lifestyle Photography", category: "Lifestyle" },
];

const testimonials = [
  { name: "Sarah Johnson", text: "Absolutely stunning work! The attention to detail and creativity is unmatched.", rating: 5 },
  { name: "Michael Chen", text: "Professional, punctual, and delivered beyond our expectations.", rating: 5 },
  { name: "Emily Rodriguez", text: "Made our wedding day even more special with beautiful photos.", rating: 5 },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const categories = ["All", ...Array.from(new Set(samplePhotos.map(photo => photo.category)))];
  const filteredPhotos = selectedCategory === "All" 
    ? samplePhotos 
    : samplePhotos.filter(photo => photo.category === selectedCategory);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Custom Cursor */}
      {isClient && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            x: mouseX,
            y: mouseY,
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 0.6,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28
          }}
        />
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Camera className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">TeeStudio</span>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["Home", "Gallery", "Services", "About", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/80 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-black/40"
          style={{ y, opacity, scale }}
        />
        
        {/* Creative Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
            animate={{
              rotate: [360, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          {/* Animated Icons */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="flex space-x-4"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Camera className="h-16 w-16 text-purple-400" />
              <Sparkles className="h-12 w-12 text-pink-400" />
              <Eye className="h-14 w-14 text-blue-400" />
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              Capture Your
            </motion.span>
            <motion.span 
              className="block mt-2"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Perfect Moment
            </motion.span>
          </motion.h1>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
          >
            Professional photography services that bring your vision to life. 
            From portraits to events, we create{" "}
            <motion.span
              className="text-purple-300 font-semibold"
              animate={{
                color: ["#c084fc", "#f472b6", "#60a5fa", "#c084fc"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              timeless memories
            </motion.span>
            .
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                View Portfolio
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.div>
              </span>
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Play className="h-5 w-5" />
              </motion.div>
              Watch Reel
            </motion.button>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { number: "500+", label: "Happy Clients" },
              { number: "1000+", label: "Photos Delivered" },
              { number: "5★", label: "Average Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              >
                <motion.div
                  className="text-3xl font-bold text-white mb-2"
                  animate={{
                    color: ["#ffffff", "#c084fc", "#f472b6", "#ffffff"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Creative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
            animate={{
              x: [0, 200, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Zap className="h-16 w-16 text-purple-400 mx-auto" />
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: "linear-gradient(90deg, #ffffff, #c084fc, #f472b6, #ffffff)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Our Creative Work
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              A glimpse into our creative journey
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Photo Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative group cursor-pointer"
                onHoverStart={() => setHoveredPhoto(photo.id)}
                onHoverEnd={() => setHoveredPhoto(null)}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div 
                  className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                  whileHover={{
                    boxShadow: "0 25px 50px rgba(168, 85, 247, 0.3)",
                    borderColor: "rgba(168, 85, 247, 0.5)"
                  }}
                  transition={{ duration: 0.3 }}
        >
          <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Animated Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredPhoto === photo.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glowing Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.3), transparent)",
                      opacity: 0
                    }}
                    animate={{
                      opacity: hoveredPhoto === photo.id ? 1 : 0,
                      background: [
                        "linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.3), transparent)",
                        "linear-gradient(135deg, transparent, rgba(244, 114, 182, 0.3), transparent)",
                        "linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.3), transparent)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Content Overlay */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: hoveredPhoto === photo.id ? 0 : 20, 
                      opacity: hoveredPhoto === photo.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <motion.h3 
                      className="text-white font-semibold text-lg mb-1"
                      animate={{
                        color: hoveredPhoto === photo.id ? ["#ffffff", "#c084fc", "#f472b6", "#ffffff"] : "#ffffff"
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {photo.category}
                    </motion.h3>
                    <p className="text-white/80 text-sm">{photo.alt}</p>
                    
                    {/* Animated Icon */}
                    <motion.div
                      className="mt-2"
                      animate={{
                        x: hoveredPhoto === photo.id ? [0, 5, 0] : 0,
                        opacity: hoveredPhoto === photo.id ? 1 : 0
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ChevronRight className="h-4 w-4 text-purple-300" />
                    </motion.div>
                  </motion.div>

                  {/* Floating Particles on Hover */}
                  {hoveredPhoto === photo.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-purple-400 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Clients Say</h2>
            <p className="text-xl text-white/70">Trusted by amazing people</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <p className="text-white font-semibold">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let&apos;s Create Together</h2>
            <p className="text-xl text-white/70">Ready to capture your story?</p>
          </motion.div>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <Phone className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
              <p className="text-white/70">+1 (555) 123-4567</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <Mail className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
              <p className="text-white/70">hello@teestudio.com</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <MapPin className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
              <p className="text-white/70">4322 D Kalayaan Avenue, Makati City, Metro Manila</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Book a Session
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="flex items-center space-x-2 mb-4 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              <Camera className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">TeeStudio</span>
            </motion.div>
            
            <div className="flex space-x-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Mail className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-white/50">&copy; 2024 TeeStudio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
