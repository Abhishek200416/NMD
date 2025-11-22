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
            About Nehemiah David Ministries
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Imparting Faith, Impacting Lives
          </p>
        </div>
      </section>

      {/* About Pastors Section */}
      <section className="section bg-white">
        <div className="container max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">About Pastors</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Pastor Image Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg flex items-center justify-center">
                <Users className="w-32 h-32 text-gray-400" />
              </div>
            </div>
            
            {/* Pastor Content */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Pastors Nehemiah David and Prathibha</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Nehemiah David and Prathibha are senior pastors of Faith Center, a large and growing body of Christian believers in Guntur, Andhra Pradesh, India. Nehemiah David is graduated from <strong>RHEMA BIBLE TRAINING CENTER, SINGAPORE</strong>. He is broadly acclaimed for his ability to teach and impart faith and to apply the principles of the Bible to practical situations and the challenges of daily living.
                </p>
                <p>
                  While helping her husband pastor Faith Center, Prathibha takes care of their children and all the home needs. Prathibha is actively involved in the women ministry and kids ministry. The desire of Prathibha's heart is to impart principles of corporate and Spirit-led prayer to the Church.
                </p>
                <p>
                  After nearly 4 years, Faith Center's church attendance has grown from thirty one people in 2016 to an active church body of more than 1,000 members. Today Faith Center sends the hope of the Gospel across the country and around the world through Television broadcasts and Social Media and brings practical help and the message of God's grace and love to an ever-growing number of people!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Faith Center */}
      <section className="section bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-900">About Faith Center</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Founded in 2016 by Senior Pastors Nehemiah David & Prathibha, Faith Center is a non-denominational, Bible-based, Spirit-empowered, and growing church committed to sharing the hope of the Gospel and making a difference in people's lives and teaching the Body of Christ how to effectively apply God's principles to have victory in every area of life.
            </p>
            <p>
              Today we meet as one church in four services every week with a heart to serve people with the unconditional and unlimited love of God for all. Our heart is for you to know the person of Jesus and to genuinely experience the life and hope He has to offer. That's why our mission is to reach people, touch lives, and make a difference.
            </p>
            <p>
              The best way to do that is through the uncompromising Word of God, so our weekend services are central to everything we do. Each service offers a great opportunity to build a rock-solid spiritual foundation that will prepare you for a growing experience of God's goodness and plan for your life.
            </p>
            <p>
              We are committed to the Vision that the Lord has given to us to reach all the people at large scale with the Good News of Jesus Christ.
            </p>
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="section bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-gray-900">What We Believe</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our fundamental beliefs are based on the inspired Word of God and guide our ministry
          </p>
          
          <div className="space-y-3">
            <Accordion type="single" collapsible className="space-y-3">
              {beliefs.map((belief, index) => (
                <AccordionItem 
                  key={index} 
                  value={`belief-${index}`} 
                  className="bg-gray-50 rounded-lg px-6 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <AccordionTrigger className="text-left font-bold text-gray-900 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span>{belief.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pt-2 pb-4">
                    {belief.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Summary Points */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">The Bible</h3>
              <p className="text-sm text-gray-600">The inspired Word of God</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Salvation</h3>
              <p className="text-sm text-gray-600">Gift of God through faith</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">The Godhead</h3>
              <p className="text-sm text-gray-600">One God in three Persons</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">The Return</h3>
              <p className="text-sm text-gray-600">Christ's second coming</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Love</h3>
              <p className="text-gray-600 text-sm">We believe love is the foundation of everything we do</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🙏</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Faith</h3>
              <p className="text-gray-600 text-sm">We trust in God's promises and His faithfulness</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Community</h3>
              <p className="text-gray-600 text-sm">We're better together, supporting and encouraging one another</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Excellence</h3>
              <p className="text-gray-600 text-sm">We honor God by doing everything with excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-900">Visit Us</h2>
          <div className="bg-gray-50 rounded-xl shadow-sm p-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="flex-shrink-0 mt-1 text-gray-700" size={20} />
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Address</h3>
                    <p className="text-gray-600 text-sm">Amaravathi Rd, above Yousta, Gorantla, Guntur, Andhra Pradesh 522034</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 mb-4">
                  <Mail className="flex-shrink-0 mt-1 text-gray-700" size={20} />
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Service Times</h3>
                    <p className="text-gray-600 text-sm">Morning: 7:00 AM - 9:00 AM | Service: 10:00 AM - 12:00 PM | Evening (Online): 6:30 PM - 8:30 PM | Friday: 7:00 PM - 9:00 PM</p>
                  </div>
                </div>
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
