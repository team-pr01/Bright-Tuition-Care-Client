import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import logo from "../../../../../assets/Icons/logo.png"
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
  row: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12 },
  signatureBox: {
    marginTop: 40,
    borderTop: "1pt solid #000",
    width: "45%",
    textAlign: "center",
    paddingTop: 4,
  },
});

const ConfirmationLetterPdf = () => (
  <Document>
    <Page size="A4" style={styles.page}>
       {/* Logo */}
        <Image
          style={styles.logo}
          src={logo}
        />
      <Text style={styles.title}>Confirmation Letter</Text>

      <Text style={styles.text}>
        Dear <Text style={{ fontWeight: "bold" }}>Tutor</Text> &{" "}
        <Text style={{ fontWeight: "bold" }}>Guardian/Student</Text>,
      </Text>

      <Text style={styles.text}>
        Congratulations! We are pleased to let you know that{" "}
        <Text style={{ fontWeight: "bold" }}>Bright Tuition Care</Text> has
        successfully connected both of you for this tuition. (Job ID: 12345)
      </Text>

      {/* Tuition Details */}
      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>Tuition Details</Text>
        <View style={styles.box}>
          <Text>Subject: Mathematics</Text>
          <Text>Class: 8</Text>
          <Text>Schedule: Mon, Wed, Fri - 6 PM</Text>
          <Text>Location: Dhaka</Text>
        </View>
      </View>

      {/* User Details */}
      <View style={[styles.section, styles.row]}>
        <View style={styles.box}>
          <Text style={{ fontWeight: "bold" }}>Guardian/Student</Text>
          <Text>Name: John Doe</Text>
          <Text>ID: G-102</Text>
          <Text>Phone: 0123456789</Text>
        </View>
        <View style={styles.box}>
          <Text style={{ fontWeight: "bold" }}>Tutor</Text>
          <Text>Name: Jane Smith</Text>
          <Text>ID: T-501</Text>
          <Text>Phone: 0987654321</Text>
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
