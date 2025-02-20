const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

// ✅ Function to send OTP
const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Generate OTP
        const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

        // Store OTP (Use Redis or DB in production)
        global.otpStore = global.otpStore || {};
        global.otpStore[email] = otp;

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`
        });

        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
};

// ✅ Function to verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "Email and OTP are required" });
        }

        if (global.otpStore[email] === otp) {
            delete global.otpStore[email]; // Remove OTP after verification
            return res.json({ success: true, message: "OTP verified" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ success: false, message: "OTP verification failed" });
    }
};

// ✅ Function to register user after OTP verification
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and Password are required" });
        }

        // You can replace this with actual DB logic
        res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "User registration failed" });
    }
};

// ✅ Ensure all functions are exported
module.exports = { sendOTP, verifyOTP, registerUser };