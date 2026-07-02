import jsPDF from "jspdf";

function DonationCertificate({ donor }) {

    const downloadCertificate = () => {

        const doc = new jsPDF("landscape");

        // Border
        doc.setDrawColor(220, 53, 69);
        doc.setLineWidth(2);
        doc.rect(10, 10, 277, 190);

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(26);
        doc.setTextColor(220, 53, 69);
        doc.text("🩸 On Live Blood Share", 148, 30, {
            align: "center"
        });

        // Subtitle
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(22);
        doc.text("CERTIFICATE OF APPRECIATION", 148, 50, {
            align: "center"
        });

        // Body
        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);

        doc.text(
            "This certificate is proudly presented to",
            148,
            75,
            {
                align: "center"
            }
        );

        // Name
        doc.setFont("times", "bold");
        doc.setFontSize(28);

        doc.text(
            donor.name,
            148,
            95,
            {
                align: "center"
            }
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);

        doc.text(
            "For selflessly donating blood and helping save lives.",
            148,
            115,
            {
                align: "center"
            }
        );

        doc.text(
            `Blood Group : ${donor.bloodGroup}`,
            40,
            145
        );

        doc.text(
            `Date : ${new Date().toLocaleDateString()}`,
            40,
            158
        );

        // Certificate ID
        const certificateId =
            "OLBS-" + Date.now().toString().slice(-6);

        doc.text(
            `Certificate ID : ${certificateId}`,
            40,
            171
        );

        // Signature
        doc.setFont("helvetica", "italic");

        doc.text(
            "Authorized by",
            220,
            160
        );

        doc.setFont("helvetica", "bold");

        doc.text(
            "On Live Blood Share Team",
            220,
            172
        );

        // Footer
        doc.setFontSize(12);

        doc.setTextColor(120);

        doc.text(
            "Thank you for making a difference. Every donation saves lives.",
            148,
            188,
            {
                align: "center"
            }
        );

        doc.save("Donation_Certificate.pdf");
    };

    return (

        <button
            className="btn btn-success"
            onClick={downloadCertificate}
        >
            📄 Download Certificate
        </button>

    );

}

export default DonationCertificate;