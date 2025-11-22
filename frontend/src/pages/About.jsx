import { useBrand } from "@/App";
import { MapPin, Mail, Phone, Heart, BookOpen, Users, Globe } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEO from "@/components/SEO";

const About = () => {
  const { currentBrand } = useBrand();

  if (!currentBrand) return null;

  const beliefs = [
    {
      title: "THE SCRIPTURES",
      content: "The Bible is the inspired Word of God, the product of holy men of old who spoke and wrote as they were moved by the Holy Spirit. The New Covenant, as recorded in the New Testament, we accept as our infallible guide in matters pertaining to conduct and doctrine (2 Tim. 3:16; 1 Thess. 2:13; 2 Peter 1:21)."
    },
    {
      title: "THE GODHEAD",
      content: "Our God is One, but manifested in three Persons—the Father, the Son, and the Holy Spirit, being coequal (Deut. 6:4; Phil. 2:6). God the Father is greater than all; the Sender of the Word (Logos) and the Begetter (John 14:28; John 16:28; John 1:14). The Son is the Word flesh-covered, the One Begotten, and has existed with the Father from the beginning (John 1:1; John 1:18; John 1:14). The Holy Spirit proceeds forth from both the Father and the Son and is eternal (John 14:16; John 15:26)."
    },
    {
      title: "MAN, HIS FALL AND REDEMPTION",
      content: "Man is a created being, made in the likeness and image of God, but through Adam's transgression and fall, sin came into the world. The Bible says \"...all have sinned, and come short of the glory of God,\" and \"...There is none righteous, no, not one\" (Rom. 3:10; 3:23). Jesus Christ, the Son of God, was manifested to undo the works of the devil and gave His life and shed His blood to redeem and restore man back to God (Rom. 5:14; 1 John 3:8). Salvation is the gift of God to man, separate from works and the Law, and is made operative by grace through faith in Jesus Christ, producing works acceptable to God (Eph. 2:8–10)."
    },
    {
      title: "ETERNAL LIFE AND THE NEW BIRTH",
      content: "Man's first step toward salvation is godly sorrow that worketh repentance. The New Birth is necessary to all men, and when experienced, produces eternal life (2 Cor. 7:10; John 3:3–5; 1 John 5:12)."
    },
    {
      title: "WATER BAPTISM",
      content: "Baptism in water is by immersion, is a direct commandment of our Lord, and is for believers only. The ordinance is a symbol of the Christian's identification with Christ in His death, burial, and resurrection (Matt. 28:19; Rom. 6:4; Col. 2:12; Acts 8:36–39)."
    },
    {
      title: "BAPTISM IN THE HOLY GHOST",
      content: "The Baptism in the Holy Ghost and fire is a gift from God as promised by the Lord Jesus Christ to all believers in this dispensation and is received subsequent to the new birth. This experience is accompanied by the initial evidence of speaking in other tongues as the Holy Spirit Himself gives utterance (Matt. 3:11; John 14:16,17; Acts 1:8; Acts 2:38,39; Acts 19:1–7; Acts 2:1–4)."
    },
    {
      title: "SANCTIFICATION",
      content: "The Bible teaches that without holiness no man can see the Lord. We believe in the Doctrine of Sanctification as a definite, yet progressive work of grace, commencing at the time of regeneration and continuing until the consummation of salvation at Christ's return (Heb. 12:14; 1 Thess. 5:23; 2 Peter 3:18; 2 Cor. 3:18; Phil. 3:12–14; 1 Cor. 1:30)."
    },
    {
      title: "DIVINE HEALING",
      content: "Healing is for the physical ills of the human body and is wrought by the power of God through the prayer of faith, and by the laying on of hands. It is provided for in the atonement of Christ, and is the privilege of every member of the Church today (James 5:14,15; Mark 16:18; Isa. 53:4,5; Matt. 8:17; 1 Peter 2:24)."
    },
    {
      title: "RESURRECTION OF THE JUST AND THE RETURN OF OUR LORD",
      content: "The angels said to Jesus' disciples, \"...This same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven.\" His coming is imminent. When He comes, \"...The dead in Christ shall rise first: Then we which are alive and remain shall be caught up together with them in the clouds to meet the Lord in the air...\" (Acts 1:11; 1 Thess. 4:16,17). Following the Tribulation, He shall return to earth as King of kings, and Lord of lords, and together with His saints, who shall be kings and priests, He shall reign a thousand years (Rev. 5:10; 20:6)."
    },
    {
      title: "HELL AND ETERNAL RETRIBUTION",
      content: "The one who physically dies in his sins without accepting Christ is hopelessly and eternally lost in the lake of fire and, therefore, has no further opportunity of hearing the Gospel or repenting. The lake of fire is literal. The terms \"eternal\" and \"everlasting,\" used in describing the duration of the punishment of the damned in the lake of fire, carry the same thought and meaning of endless existence as used in denoting the duration of joy and ecstasy of saints in the Presence of God (Heb. 9:27; Rev. 19-20)."
    }
  ];

  return (
    <div>
      <SEO 
        title={`About ${currentBrand.name}`}
        description={`Learn more about ${currentBrand.name}. ${currentBrand.tagline}. Our mission, vision, and values guide everything we do.`}
        url={window.location.href}
      />
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="about-title">
            About {currentBrand.name}
          </h1>
          {currentBrand.tagline && (
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {currentBrand.tagline}
            </p>
          )}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div data-testid="mission-section">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To be a community where people encounter God's love, grow in faith, and serve with purpose. 
                We're committed to creating an environment where everyone feels welcomed, valued, and empowered 
                to live out their God-given potential.
              </p>
            </div>
            <div data-testid="vision-section">
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To see lives transformed by the power of God's word, building a thriving community that reflects 
                His love and compassion. We envision a church that impacts our local community and reaches beyond, 
                making disciples who make disciples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" data-testid="story-title">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              {currentBrand.name} began with a simple vision: to create a place where people could experience 
              authentic community and encounter God in a meaningful way. What started as a small gathering has 
              grown into a vibrant community of believers committed to making a difference.
            </p>
            <p className="mb-4">
              Over the years, we've seen countless lives transformed through the power of God's love. From healing 
              and restoration to purpose and calling, our community has witnessed the faithfulness of God in every season.
            </p>
            <p>
              Today, we continue to be driven by the same passion that sparked our beginning: to love God, love people, 
              and serve our community with excellence and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center" data-testid="values-title">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Love</h3>
              <p className="text-gray-600 text-sm">We believe love is the foundation of everything we do</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🙏</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Faith</h3>
              <p className="text-gray-600 text-sm">We trust in God's promises and His faithfulness</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600 text-sm">We're better together, supporting and encouraging one another</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">We honor God by doing everything with excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" data-testid="faq-title">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6" data-testid={`faq-item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Location Section */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" data-testid="location-title">Visit Us</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600 text-sm">{currentBrand.location || "Rajendra Nagar opposite Icon Mall, Guntur"}</p>
                  </div>
                </div>
                {currentBrand.service_times && (
                  <div className="flex items-start space-x-3 mb-4">
                    <Mail className="flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1">Service Times</h3>
                      <p className="text-gray-600 text-sm">{currentBrand.service_times}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.8!2d80.4365!3d16.3067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDE4JzI0LjEiTiA4MMKwMjYnMTEuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
