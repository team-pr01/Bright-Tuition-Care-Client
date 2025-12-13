/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import logo from "../../../../../assets/Icons/logo.png";
import { Image } from "@react-pdf/renderer";

// PDF styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 24,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  logo: {
    width: 150,
    height: 40,
    marginBottom: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 12,
  },
  text: { marginBottom: 8 },
  section: { marginBottom: 16 },
  box: {
    border: "1pt solid #999",
    padding: 8,
    borderRadius: 2,
    marginBottom: 12,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  signatureBox: {
    marginTop: 40,
    borderTop: "1pt solid #000",
    width: "45%",
    textAlign: "center",
    paddingTop: 4,
  },
});

const ConfirmationLetterPdf = ({ data }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Logo */}
      <Image style={styles.logo} src={logo} />
      <Text style={styles.title}>Confirmation Letter</Text>

      <Text style={{ ...styles.text, marginTop: 10 }}>
        Dear <Text style={{ fontWeight: "bold" }}>Tutor</Text> &{" "}
        <Text style={{ fontWeight: "bold" }}>Guardian/Student</Text>,
      </Text>

      <Text style={styles.text}>
        Congratulations! We are pleased to let you know that{" "}
        <Text style={{ fontWeight: "bold" }}>Bright Tuition Care</Text> has
        successfully connected both of you for this tuition Job ID:{" "}
        {data?.jobId?.jobId}.
      </Text>

      <Text style={styles.text}>
        Below is a summary of the key requirements and agreed-upon details for
        this tuition engagement.
      </Text>

      <Text style={styles.text}>
        To ensure clarity and prevent any future misunderstandings, we kindly
        request both the Tutor and the Guardian/Student to review and sign the
        confirmation letter.
      </Text>

      <Text style={[styles.text, { fontWeight: "bold", marginTop: 12 }]}>
        Thank you for your cooperation.
      </Text>

      {/* Tuition Details */}
      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>Tuition Details</Text>
        <View style={styles.box}>
          <Text>Subject: {data?.jobId?.subjects?.join(", ")}</Text>
          <Text>Class: {data?.jobId?.class}</Text>
          <Text>Salary: {data?.jobId?.salary}</Text>
          <Text>
            Schedule: {data?.jobId?.tutoringDays}, {data?.jobId?.tutoringTime}
          </Text>
          <Text>
            Location: {data?.jobId?.city}, {data?.jobId?.area}
          </Text>
        </View>
      </View>

      {/* User Details */}
      <View style={[styles.section, styles.row]}>
        <View style={styles.box}>
          <Text style={{ fontWeight: "bold" }}>Guardian/Student</Text>
          <Text>
            Name: {data?.guardianId?.name || data?.jobId?.guardianName || "N/A"}
          </Text>
          <Text>Email: {data?.guardianId?.email || "N/A"}</Text>
          <Text>
            Phone:{" "}
            {data?.guardianId?.phoneNumber ||
              data?.jobId?.guardianPhoneNumber ||
              "N/A"}
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={{ fontWeight: "bold" }}>Tutor</Text>
          <Text>Name: {data?.tutorId?.name}</Text>
          <Text>ID: {data?.tutorId?.email}</Text>
          <Text>Phone: {data?.tutorId?.phoneNumber}</Text>
        </View>
      </View>

      {/* Signatures */}
      <View style={[styles.section, styles.row]}>
        <View style={styles.signatureBox}>
          <Text>Guardian/Student Signature</Text>
          <Text>(with Date)</Text>
        </View>
        <View style={styles.signatureBox}>
          <Text>Tutor Signature</Text>
          <Text>(with Date)</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default ConfirmationLetterPdf;
