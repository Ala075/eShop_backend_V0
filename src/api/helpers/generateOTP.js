// generateOTP.js

import otpGenerator from "otp-generator";

// Fonction pour générer un OTP
const generateOTP = () => {
  // Générer un OTP de 6 chiffres
  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  return otp;
};

export default generateOTP;
