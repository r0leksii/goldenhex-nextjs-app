"use client";
import useGlobalContext from "@/hooks/use-context";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const ProfileSidebar = ({ activeTab, onSelectTab }: Props) => {
  const { logout, user } = useGlobalContext();
  const router = useRouter();
  const handleAdminPannel = () => {
    router.push(`${process.env.ADMIN_URL}`);
  };

  return (
    <div className="col-xl-3 col-lg-4">
      <div className="student-profile-sidebar mb-30">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={activeTab === "home" ? "nav-link active" : "nav-link"}
              id="home-tab"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected={activeTab === "home"}
              onClick={() => onSelectTab("home")}
            >
              <i className="fas fa-tachometer-alt-fast"></i>
              Dashboard
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={activeTab === "profile" ? "nav-link active" : "nav-link"}
              id="profile-tab"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected={activeTab === "profile"}
              onClick={() => onSelectTab("profile")}
            >
              <i className="fas fa-user"></i> My Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={activeTab === "history" ? "nav-link active" : "nav-link"}
              id="history-tab"
              type="button"
              role="tab"
              aria-controls="history"
              aria-selected={activeTab === "history"}
              onClick={() => onSelectTab("history")}
            >
              <i className="fas fa-cart-plus"></i> Order Products
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className={activeTab === "wishlist" ? "nav-link active" : "nav-link"}
              id="wishlist-tab"
              type="button"
              role="tab"
              aria-controls="wishlist"
              aria-selected={activeTab === "wishlist"}
              onClick={() => onSelectTab("wishlist")}
            >
              <i className="fa-solid fa-money-check"></i> Payment History
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={activeTab === "reviews" ? "nav-link active" : "nav-link"}
              id="reviews-tab"
              type="button"
              role="tab"
              aria-controls="reviews"
              aria-selected={activeTab === "reviews"}
              onClick={() => onSelectTab("reviews")}
            >
              <i className="fas fa-star"></i> Reviews
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={activeTab === "comments" ? "nav-link active" : "nav-link"}
              id="comments-tab"
              type="button"
              role="tab"
              aria-controls="comments"
              aria-selected={activeTab === "comments"}
              onClick={() => onSelectTab("comments")}
            >
              <i className="fa-solid fa-comment"></i> My Comments
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className={activeTab === "setting" ? "nav-link active" : "nav-link"}
              id="setting-tab"
              type="button"
              role="tab"
              aria-controls="setting"
              aria-selected={activeTab === "setting"}
              onClick={() => onSelectTab("setting")}
            >
              <i className="fas fa-cog"></i> Settings
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={activeTab === "cancel" ? "nav-link active" : "nav-link"}
              id="cancel-tab"
              type="button"
              role="tab"
              aria-controls="cancel"
              aria-selected={activeTab === "cancel"}
              onClick={() => onSelectTab("cancel")}
            >
              <i className="fas fa-cog"></i> Cancel Orders
            </button>
          </li>
          {user?.role === "admin" && (
            <li className="nav-item" role="presentation">
              <button onClick={handleAdminPannel} className="nav-link">
                <i className="fa-solid fa-lock"></i> Admin Pannel
              </button>
            </li>
          )}

          <li className="nav-item" role="presentation">
            <button
              onClick={logout}
              className="nav-link"
              id="logout-tab"
              type="button"
              role="tab"
              aria-controls="logout"
              aria-selected="false"
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
