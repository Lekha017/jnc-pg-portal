function ProgramContent({ details, fees }) {
    const Section = ({ title, content }) => {
        if (!content) return null;

        return (
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-[#2D2A70] mb-4">
                    {title}
                </h2>

                <div className="text-gray-700 leading-8 whitespace-pre-line">
                    {content}
                </div>
            </div>
        );
    };

    return (
        <div>

            {/* Eligibility */}
            <Section
                title="Eligibility"
                content={details?.eligibility}
            />

            {/* Programme Details */}
            <Section
                title="Programme Details"
                content={details?.programmeDetails}
            />

            {/* Selection Process */}
            <Section
                title="Selection Process"
                content={details?.selectionProcess}
            />

            {/* Programme Objectives */}
            <Section
                title="Programme Objectives"
                content={details?.programmeObjectives}
            />

            {/* Programme Outcomes */}
            <Section
                title="Programme Outcomes"
                content={details?.programmeOutcomes}
            />

            {/* Potential Career Options */}
            <Section
                title="Potential Career Options"
                content={details?.potentialCareerOptions}
            />

            {/* Fee Structure */}
            {fees?.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-[#2D2A70] mb-5">
                        Fee Structure
                    </h2>

                    <div className="overflow-hidden rounded-2xl border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-[#2D2A70] text-white">
                                <tr>
                                    <th className="p-4 text-left">
                                        Academic Year
                                    </th>

                                    <th className="p-4 text-left">
                                        Karnataka
                                    </th>

                                    <th className="p-4 text-left">
                                        Other States
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {fees.map((fee) => (
                                    <tr
                                        key={fee._id}
                                        className="border-t border-gray-200"
                                    >
                                        <td className="p-4">
                                            {fee.year}
                                        </td>

                                        <td className="p-4">
                                            ₹{fee.insideKarnatakaFee}
                                        </td>

                                        <td className="p-4">
                                            ₹{fee.outsideKarnatakaFee}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Syllabus */}
            {(details?.syllabus || details?.syllabusPdf) && (
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-[#2D2A70] mb-4">
                        Syllabus
                    </h2>

                    {details?.syllabus && (
                        <div className="text-gray-700 leading-8 whitespace-pre-line">
                            {details.syllabus}
                        </div>
                    )}

                    {details?.syllabusPdf && (
                        <a
                            href={details.syllabusPdf}
                            target="_blank"
                            rel="noreferrer"
                            className="
                                inline-block
                                mt-5
                                bg-[#2D2A70]
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                hover:bg-[#24205f]
                                transition
                            "
                        >
                            Download Syllabus
                        </a>
                    )}
                </div>
            )}

        </div>
    );
}

export default ProgramContent;