/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { IMAGES } from "../../../../assets";
import type { TEducation } from "../../../../types/tutor.types";
import NunitoRegular from "../../../../assets/Fonts/Nunito-Regular.ttf";

Font.register({
  family: "Nunito",
  src: NunitoRegular,
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Nunito",
    padding: 30,
    fontSize: 11,
    backgroundColor: "#ffffff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    borderBottom: "1px solid #d1d5db",
    marginTop: 15,
    paddingBottom: 4,
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    marginTop: 8,
  },
  gridRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  label: {
    width: 140,
    fontWeight: "bold",
    color: "#111827",
  },
  value: {
    color: "#374151",
  },
  profileRow: {
    flexDirection: "row",
    gap: 15,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    objectFit: "cover",
  },
  tutorInfo: {
    flex: 1,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  overview: {
    marginTop: 6,
    fontSize: 11,
    color: "#4b5563",
  },
});

const TutorResumePDF = ({ profile }: { profile: any }) => {
  const personalInfo = profile?.personalInformation || {};
  const tuitionPreference = profile?.tuitionPreference || {};
  const educationDetails = profile?.educationalInformation || [];

  const personalData = [
    { label: "Gender", value: personalInfo.gender || "N/A" },
    { label: "Religion", value: personalInfo.religion || "N/A" },
    { label: "Nationality", value: personalInfo.nationality || "N/A" },
    {
      label: "Date of Birth",
      value: personalInfo.dateOfBirth
        ? new Date(personalInfo.dateOfBirth).toLocaleDateString()
        : "N/A",
    },
    { label: "Father's Name", value: personalInfo.fatherName || "N/A" },
    { label: "Father's Phone", value: personalInfo.fatherPhoneNumber || "N/A" },
    { label: "Mother's Name", value: personalInfo.motherName || "N/A" },
    { label: "Mother's Phone", value: personalInfo.motherPhoneNumber || "N/A" },
    {
      label: "Additional Phone",
      value: personalInfo.additionalPhoneNumber || "N/A",
    },
    { label: "Address", value: personalInfo.address || "N/A" },
  ];

  const filteredPersonalData = personalData.filter(
    (item) => item.value && item.value !== "N/A"
  );

  const tuitionData = [
    { label: "Preferred Location", value: tuitionPreference.preferredLocation },
    {
      label: "Preferred Categories",
      value: Array.isArray(tuitionPreference.preferredCategories)
        ? tuitionPreference.preferredCategories.join(", ")
        : tuitionPreference.preferredCategories,
    },
    {
      label: "Preferred Classes",
      value: Array.isArray(tuitionPreference.preferredClasses)
        ? tuitionPreference.preferredClasses.join(", ")
        : tuitionPreference.preferredClasses,
    },
    {
      label: "Preferred Subjects",
      value: tuitionPreference.preferredSubjects,
    },
    {
      label: "Tutoring Method",
      value: tuitionPreference.tutoringMethod,
    },
    {
      label: "Tuition Style",
      value: Array.isArray(tuitionPreference.tuitionStyle)
        ? tuitionPreference.tuitionStyle.join(", ")
        : tuitionPreference.tuitionStyle,
    },
    {
      label: "Available Days",
      value: Array.isArray(tuitionPreference.availableDays)
        ? tuitionPreference.availableDays.join(", ")
        : tuitionPreference.availableDays,
    },
    {
      label: "Available Time",
      value: tuitionPreference.availableTime
        ? `${tuitionPreference.availableTime.from} - ${tuitionPreference.availableTime.to}`
        : null,
    },
    {
      label: "Expected Salary",
      value: tuitionPreference.expectedSalary
        ? `${tuitionPreference.expectedSalary} BDT`
        : null,
    },
  ].filter((item) => item.value && item.value !== "");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Profile Section */}
        <View style={styles.profileRow}>
          <Image
            src={profile?.imageUrl || IMAGES.dummyAvatar}
            style={styles.profileImage}
          />
          <View style={styles.tutorInfo}>
            <Text style={styles.tutorName}>{profile?.userId?.name}</Text>
            <Text>Tutor ID: {profile?.tutorId}</Text>
            <Text>Phone Number: {profile?.userId?.phoneNumber}</Text>
            <Text style={styles.overview}>
              {personalInfo.overview || "No overview available."}
            </Text>
          </View>
        </View>

        {/* Education Section */}
        <Text style={styles.sectionTitle}>Education</Text>
        {educationDetails.map((edu: TEducation, index: number) => (
          <View key={index} style={{ marginTop: 5 }}>
            <Text style={{ fontWeight: "bold", color: "#111827" }}>
              • {edu.degree || "Education"}
            </Text>
            <View style={styles.grid}>
              <View style={styles.gridRow}>
                <Text style={styles.label}>Institute Name</Text>
                <Text style={styles.value}>{edu.instituteName || "N/A"}</Text>
              </View>
              <View style={styles.gridRow}>
                <Text style={styles.label}>Department</Text>
                <Text style={styles.value}>
                  {edu.department || edu.group || "N/A"}
                </Text>
              </View>
              <View style={styles.gridRow}>
                <Text style={styles.label}>Curriculum</Text>
                <Text style={styles.value}>{edu.medium || "N/A"}</Text>
              </View>
              <View style={styles.gridRow}>
                <Text style={styles.label}>Result</Text>
                <Text style={styles.value}>{edu.result || "N/A"}</Text>
              </View>
              <View style={styles.gridRow}>
                <Text style={styles.label}>Passing Year</Text>
                <Text style={styles.value}>{edu.passingYear || "N/A"}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Tuition Section */}
        <Text style={styles.sectionTitle}>Tuition Related Information</Text>
        <View style={styles.grid}>
          {tuitionData.map((item, index) => (
            <View style={styles.gridRow} key={index}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Personal Information Section */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.grid}>
          {filteredPersonalData.map((item, index) => (
            <View style={styles.gridRow} key={index}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default TutorResumePDF;
