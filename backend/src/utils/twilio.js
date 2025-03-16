import twilio from "twilio";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Initialize Twilio Client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Generate a 6-digit OTP
export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via Twilio WhatsApp
export const sendOtp = async (phone, otp) => {
    try {
        const message = await client.messages.create({
            body: `Your OTP is ${otp}. It is valid for 5 minutes.`,
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`, // Use WhatsApp format
            to: `whatsapp:${phone}`, // User's WhatsApp number
        });

        return { success: true, message: "OTP sent successfully via WhatsApp.", sid: message.sid };
    } catch (error) {
        return { success: false, message: "Failed to send OTP via WhatsApp.", error: error.message };
    }
};

// Hash OTP before storing in the database
export const hashOtp = async (otp) => {
    return await bcrypt.hash(otp, 10);
};

// Verify OTP (hashed vs user input)
export const verifyOtp = async (hashedOtp, inputOtp) => {
    return await bcrypt.compare(inputOtp, hashedOtp);
};

// Send Order Confirmation via WhatsApp
export const sendOrderConfirmation = async (phone, orderId, totalPrice) => {
    try {
        const message = await client.messages.create({
            body: `Your order #${orderId} has been created successfully. Total: $${totalPrice}.`,
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`, // Send via WhatsApp
            to: `whatsapp:${phone}`, // User's WhatsApp number
        });

        return { success: true, message: "Order confirmation sent via WhatsApp.", sid: message.sid };
    } catch (error) {
        return { success: false, message: "Failed to send order confirmation.", error: error.message };
    }
};