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
        <section className="bg-slate-100 py-14 lg:py-16">
            <div className="max-w-6xl mx-auto px-6 lg:px-10">

                {/* Content */}
                <div className="space-y-8 text-justify text-gray-800 font-serif leading-9 text-[18px]">
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

                {/* Admission Enquiry */}
                <div
                    className="mt-12 max-w-6xl mx-auto border border-gray-300 rounded-2xl bg-transparent px-6 py-6"
                    style={{ fontFamily: "Cambria, 'Times New Roman', serif" }}
                >
                    <h3 className="text-center text-[20px] md:text-[22px] font-bold text-black mb-8">
                        For Admission Enquiries
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        {admissionContacts.map((contact) => (
                            <div key={contact.id}>
                                <p className="text-[15px] md:text-[16px] font-bold text-black whitespace-nowrap">
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