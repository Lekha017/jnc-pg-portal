const admissionContacts = [
    {
        id: 1,
        name: "Ms. Jaya Thomas",
        phone: "88849 82277",
    },
    {
        id: 2,
        name: "Mr. Bhagayanathan",
        phone: "89711 92474",
    },
    {
        id: 3,
        name: "Ms. Vijaya",
        phone: "98809 90642",
    },
];

function AboutPGCentre() {
    return (
        <section className="bg-slate-100 py-10 sm:py-12 lg:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

                {/* =========================
                    CONTENT
                ========================= */}

                <div
                    className="
                        space-y-6
                        sm:space-y-7
                        lg:space-y-8
                        text-justify
                        text-gray-800
                        font-serif
                        leading-7
                        sm:leading-8
                        lg:leading-9
                        text-[16px]
                        sm:text-[17px]
                        lg:text-[18px]
                    "
                >
                    <p>
                        The Postgraduate Centre of Jyoti Nivas College, Autonomous,
                        Bangalore, is dedicated to the pursuit of academic excellence,
                        advanced research, and professional development. Established to
                        provide high-quality postgraduate education, the Centre offers a
                        wide spectrum of programs that equip students with in-depth
                        knowledge, critical perspectives, and the skills required to excel
                        in their respective fields.
                    </p>

                    <p>
                        Guided by the founding vision of the institution, the PG Centre
                        upholds a strong commitment to intellectual rigor, value-based
                        education, and holistic growth. The academic environment is enriched
                        by experienced faculty members, well-resourced infrastructure, and
                        an emphasis on research, innovation, and interdisciplinary learning.
                        The Postgraduate Centre strives to cultivate not only academic
                        proficiency but also ethical responsibility and leadership
                        qualities, thereby preparing graduates to contribute effectively to
                        academia, industry, and society at large.
                    </p>
                </div>

                {/* =========================
                    ADMISSION ENQUIRY
                ========================= */}

                <div
                    className="
                        mt-8
                        sm:mt-10
                        lg:mt-12
                        w-full
                        border
                        border-gray-300
                        rounded-xl
                        sm:rounded-2xl
                        bg-transparent
                        px-4
                        sm:px-6
                        py-5
                        sm:py-6
                    "
                    style={{
                        fontFamily: "Cambria, 'Times New Roman', serif",
                    }}
                >
                    {/* Heading */}

                    <h3
                        className="
                            text-center
                            text-[18px]
                            sm:text-[20px]
                            md:text-[22px]
                            font-bold
                            text-black
                            mb-6
                            sm:mb-8
                        "
                    >
                        For Admission Enquiries
                    </h3>

                    {/* Contacts */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            md:grid-cols-3
                            gap-4
                            sm:gap-5
                            md:gap-6
                            text-center
                        "
                    >
                        {admissionContacts.map((contact) => (
                            <div
                                key={contact.id}
                                className="
                                    w-full
                                    px-2
                                "
                            >
                                <p
                                    className="
                                        text-[14px]
                                        sm:text-[15px]
                                        md:text-[16px]
                                        font-bold
                                        text-black
                                        break-words
                                    "
                                >
                                    {contact.name} - {contact.phone}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default AboutPGCentre;