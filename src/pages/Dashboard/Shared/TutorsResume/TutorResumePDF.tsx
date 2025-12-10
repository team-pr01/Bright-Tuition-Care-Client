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
import { ICONS, IMAGES } from "../../../../assets";
import type { TEducation } from "../../../../types/tutor.types";
import NunitoRegular from "../../../../assets/Fonts/Nunito-Regular.ttf";
import NunitoBold from "../../../../assets/Fonts/Nunito-Bold.ttf";
import blueVerifiedBlue from "../../../../assets/Icons/blueVerified-blue.png";

Font.register({
  family: "Nunito",
  fonts: [
    { src: NunitoRegular, fontWeight: "normal" },
    { src: NunitoBold, fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Nunito",
    paddingHorizontal: 30,
    paddingVertical: 15,
    fontSize: 11,
    backgroundColor: "#ffffff",
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 150,
    height: "auto",
    objectFit: "contain",
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
   width: "100%",
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
    flexWrap: "wrap", 
  },
  profileRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 15,
  },
  profileImageWrapper: {
    position: "relative",
    width: 90,
    height: 90,
  },
  verifiedIcon: {
    position: "absolute",
    bottom: -9,
    right: -10,
    width: 25,
    height: 25,
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
  // New styles for education grid
  educationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  educationCard: {
    width: "48%",
    marginBottom: 10,
  },
  educationDegree: {
    fontWeight: "bold",
    color: "#111827",
    fontSize: 12,
  },
  educationRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  educationLabel: {
    width: 80,
    fontWeight: "bold",
    color: "#111827",
    fontSize: 10,
  },
  educationValue: {
    flex: 1,
    color: "#374151",
    fontSize: 10,
  },
  thanksNote: {
    position: "absolute",
    bottom: 20, // same as page padding
    left: 0,
    right: 0,
    alignItems: "center",
  },

  thanksText: {
    fontSize: 10,
    color: "#111827",
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

  // For profile image - ensure it's a valid URL or use base64 data
  const getProfileImageSrc = () => {
    if (profile?.imageUrl) {
      return profile.imageUrl;
    }
    return IMAGES.dummyAvatar;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo Section */}
        <View style={styles.logoWrapper}>
          <Image src={ICONS.logo} style={styles.logo} />
        </View>
        {/* Profile Section */}
        <View style={styles.profileRow}>
          <View style={styles.profileImageWrapper}>
            <Image src={getProfileImageSrc()} style={styles.profileImage} />

            {!profile?.isVerified && (
              <Image src={blueVerifiedBlue} style={styles.verifiedIcon} />
            )}
          </View>

          <View style={styles.tutorInfo}>
            <Text style={styles.tutorName}>{profile?.userId?.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>Tutor ID: {profile?.tutorId}</Text>
              <Text style={{ marginHorizontal: 6 }}>|</Text>
              <Text>Rating: {profile?.rating}/5</Text>
            </View>

            <Text>Phone Number: {profile?.userId?.phoneNumber}</Text>
            <Text style={styles.overview}>
              {personalInfo.overview || "No overview available."}
            </Text>
          </View>
        </View>

        {/* Education Section - Now in 2-column grid */}
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.educationGrid}>
          {educationDetails.map((edu: TEducation, index: number) => (
            <View key={index} style={styles.educationCard}>
              <Text style={styles.educationDegree}>
                {edu.degree || "Education"}
              </Text>
              <View style={styles.grid}>
                <View style={styles.educationRow}>
                  <Text style={styles.educationLabel}>Institute</Text>
                  <Text style={styles.educationValue}>
                    {edu.instituteName || "N/A"}
                  </Text>
                </View>
                <View style={styles.educationRow}>
                  <Text style={styles.educationLabel}>Department</Text>
                  <Text style={styles.educationValue}>
                    {edu.department || edu.group || "N/A"}
                  </Text>
                </View>
                <View style={styles.educationRow}>
                  <Text style={styles.educationLabel}>Curriculum</Text>
                  <Text style={styles.educationValue}>
                    {edu.medium || "N/A"}
                  </Text>
                </View>
                <View style={styles.educationRow}>
                  <Text style={styles.educationLabel}>Result</Text>
                  <Text style={styles.educationValue}>
                    {edu.result || "N/A"}
                  </Text>
                </View>
                <View style={styles.educationRow}>
                  <Text style={styles.educationLabel}>Passing Year</Text>
                  <Text style={styles.educationValue}>
                    {edu.passingYear || "N/A"}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

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
        {/* Thanks note */}
        <View style={styles.thanksNote}>
          <Text style={styles.thanksText}>
            Thanks for staying with Bright Tuition Care
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default TutorResumePDF;
