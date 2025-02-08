import { auth } from "@/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import React, { useState } from "react";

const useChangePassword = () => {
  const user = auth.currentUser;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);

  const reauthenticateUser = async (currentPassword: string) => {
    if (user && user.email) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      try {
        await reauthenticateWithCredential(user, credential);
        return true;
      } catch (error) {
        console.error("Error reauthenticating user:", error);
        alert("Failed to reauthenticate. Please check your current password.");
        return false;
      }
    }
    return false;
  };

  const checkPassword = async () => {
    const isAuthenticated = await reauthenticateUser(currentPassword);
    if (!isAuthenticated) {
      return false;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }
    return true;
  };

  const handleUpdatePassword = async () => {
    const isSuccess = await checkPassword();
    if (isSuccess && user) {
      setIsUpdating(true);
      try {
        await updatePassword(user, newPassword);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      } finally {
        setIsUpdating(false);
        resetPassword();
      }
    }
  };

  const resetPassword = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    isUpdating,
    handleUpdatePassword,
  };
};

export default useChangePassword;
