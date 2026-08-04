import { useEffect, useState } from "react";

import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const images = [
    "/welfare1.jfif",
    "/welfare2.jfif",
    "/welfare3.jfif",
    "/welfare4.jfif",
      "/welfare5.jpg",
        "/welfare6.jpg",
];

const StaffWelfareServices = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Header />
            <Navbar />

            {/* Hero */}

            <section className="bg-[#2F2F6F] py-14">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold text-white">
                        Staff Welfare Services
                    </h1>
                </div>
            </section>

            {/* Content */}

            <section className="bg-white py-14">
                <div className="max-w-5xl mx-auto px-6">

                    {/* Image Slider */}

                    <div className="relative h-[420px] rounded-xl overflow-hidden shadow-md">

                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt=""
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentImage === index
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                            />
                        ))}

                    </div>

                    {/* Intro */}

                    <div className="mt-10">

                        <p className="text-gray-700 leading-8 text-justify">

                            <span className="font-bold text-[#E91E63] uppercase">
                                Faculty Empowerment Strategies:
                            </span>{" "}

                            The institution prioritises the welfare of all its employees.
                            Many measures are in place to augment the professional ecosystem
                            and offer necessary support to all teaching and non-teaching staff.

                        </p>

                    </div>

                    {/* Faculty Welfare Accordions */}

                    <div className="mt-10 space-y-4">

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Financial Aid
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">

                               Financial aid is provided to both teaching and non-teaching staff in the form of salary advance in times of need. Need-based short term loans are also given to staff for personal use. Children's Educational fees for employees are provided as advance at the beginning of the academic year. The institution also addresses medical emergencies for employees either as a contribution or advance to the family concerned.

                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Uniforms
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">

                               Support staff are provided with six sets of uniform for daily wear which goes a long way towards easing expenses on clothing.

                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Refreshment
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">

                               Caretakers and administrative staff are provided beverages daily. Refreshments are given whenever they have to work overtime or on holidays. They are also paid for any work done on overtime basis. Teaching and non-teaching staff are provided refreshments during college programmes/occasions celebrated together.
                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Token of Appreciation
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">

                               The Management acknowledges the service and commitment of both teaching and non-teaching staff through thoughtful and useful gifts on Teachers' Day and for Christmas.

                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Completion of 25 Years of Service
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">

                              Staff who complete 25 years of service in JNC are felicitated on College Day. Their family members are also invited for the occasion.
                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Recreational Trips for All Staff
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">

                              In order to promote healthy and recreational bonding among staff members, outstation trips are organised annually for both teaching and non-teaching staff. Such trips result in reducing employee stress and develop camaraderie among faculty from various departments.

                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Faculty Enhancement Programmes
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">

                              Faculty enhancement programmes are conducted periodically to bring about a holistic, skill-centric and outcome based learning process for faculty members. These FDPs emphasise on re-energising critical thinking abilities and upgrading pedagogical approaches. Such programmes help in disseminating and transferring skills in domains that are of contemporary relevance.

                            </div>

                        </details>

                    </div>
                    {/* Infrastructure Support */}

                    <h2 className="mt-14 mb-6 text-2xl font-bold text-[#E91E63] uppercase">
                        Infrastructural Support
                    </h2>

                    <div className="space-y-4">

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Parking Facility
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">
                               Free parking facility is provided for teaching and non-teaching staff
                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Medical Facilities
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">
                                College has a medical room with a doctor on call and a nurse on duty. The college has an agreement with Mabel Clinic which provides on-campus services. The instituion also has terms of engagement with Apollo Clinic located opposite the college to deal with emergencies.
                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Staff Lounge
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">
                                Separate lounges are provided for men and women faculty where employees can relax, and engage in team- building activities. The room is equipped with RO drinking water purifier for supply of hot/cold water.
                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Free Wi-Fi Access to Staff
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">
                                Staff can access unlimited digital content via college Wi-fi.
                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Gymnasium
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">
                              A state-of-the-art gymnasium with the latest fitness equipments is available for the use of staff and students.
                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Meditation Room / Inter-Faith Room
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">
                               This facility has a serene and calm atmosphere, which helps one to recharge physically and mentally, and have a quiet reflective moment.
                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Food Court
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">
                               A modern cafeteria with a wide range of cuisines to cater to the different palettes on campus provides food at nominal rates for students and staff all through the working day.
                            </div>

                        </details>

                        <details className="border border-gray-300 rounded-lg overflow-hidden">

                            <summary className="cursor-pointer px-6 py-5 font-semibold text-lg">
                                Snack Vending Machine
                            </summary>

                            <div className="px-6 pb-6 text-gray-700 leading-8">
                              Two snack vending machines have been installed and are made full use of by staff and students.
                            </div>

                        </details>

                    </div>
                    {/* Coordinators */}

                    <div className="mt-14">

                        <h2 className="text-2xl font-bold text-[#2F2F6F] mb-6">
                            Coordinators
                        </h2>

                        <div className="overflow-x-auto">

                            <table className="w-full border border-gray-200">

                                <tbody>

                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <td className="p-4 border-r border-gray-200 font-medium">
                                            Sr. Sajitha Jose
                                        </td>

                                        <td className="p-4 font-medium">
                                            Ms. Naureen Aziz
                                        </td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="p-4 border-r border-gray-200 font-medium">
                                            Dr. Goolappa Okkunda
                                        </td>

                                        <td className="p-4 font-medium">
                                            Dr. Roopa Philip
                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </>
    );
};

export default StaffWelfareServices;