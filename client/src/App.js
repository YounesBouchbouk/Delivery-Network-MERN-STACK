import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login/Login";
import SignUp from "./pages/Authentication/SignUp/SignUp";
import Home from "./pages/Home";

import "./App.css";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Dashboard from "./pages/Costumer/Cdashboard";
import Forgetpassword from "./pages/Authentication/ResetPassword/Forgetpassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/routes/AdminRoutes";
import Listusers from "./pages/admin/Listusers";
import Newpassword from "./pages/Authentication/ResetPassword/Newpassword";
import ConfirmProcess from "./pages/Authentication/ConfirmEmail/ConfirmProcess";
import AdminProfil from "./pages/admin/AdminProfil";
import AdminUsersProfil from "./pages/admin/AdminUsersProfil";
import DeliveryRoute from "./components/routes/DeliveryRoute";
import CompanieDashboard from "./pages/Companie/CompanieDashboard";
import Profil from "./pages/Profil";
import useFindUser from "./hooks/useFindUser";
import { UserContext } from "./hooks/Usercontext";
import CompleteInformation from "./pages/Companie/CompleteInformation";
import ServicesDashboard from "./pages/Companie/ServicesDashboard";
import Path from "./pages/Costumer/Path";
import PackageStepper from "./pages/Costumer/PackageStepper";
import PackageDetails from "./pages/PackageDetails";
import CompaniePackages from "./pages/Companie/CompaniePackages";
import AdminFindPath from "./components/admin/AdminFindPath";

function App() {
  const { user, setUser, isLoading } = useFindUser();

  return (
    <>
      <Router>
        {/* <Header /> */}
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <Routes>
            <Route exact path="/login" element={<PublicRoute />}>
              <Route exact path="/login" element={<Login />} />
            </Route>
            <Route exact path="/signup" element={<PublicRoute />}>
              <Route exact path="/signup" element={<SignUp />} />
            </Route>
            <Route exact path="/Forgetpassword" element={<PublicRoute />}>
              <Route
                exact
                path="/Forgetpassword"
                element={<Forgetpassword />}
              />
            </Route>
            <Route exact path="/newpassword/:token" element={<PublicRoute />}>
              <Route
                exact
                path="/newpassword/:token"
                element={<Newpassword />}
              />
            </Route>
            <Route
              exact
              path="/emailconfirmation/:Emailtoken"
              element={<PublicRoute />}
            >
              <Route
                exact
                path="/emailconfirmation/:Emailtoken"
                element={<ConfirmProcess />}
              />
            </Route>

            <Route exact path="/" element={<Home />} />
          </Routes>

          {/* User / Costumer / Sender routes  */}
          <Routes>
            <Route exact path="/user" element={<PrivateRoute />}>
              <Route exact path="/user/dashboard" element={<Dashboard />} />
              <Route exact path="/user/dashboard/profil" element={<Profil />} />
              <Route exact path="/user/paths" element={<Path />} />
              <Route
                exact
                path="/user/package/:packageId"
                element={<PackageDetails thisfor={"user"} />}
              />
              <Route
                exact
                path="/user/new/package"
                element={<PackageStepper />}
              />
            </Route>
          </Routes>

          {/* Admin routes  Only For Admin */}
          <Routes>
            <Route exact path="/admin/" element={<AdminRoute />}>
              <Route
                exact
                path="/admin/Dashboard"
                element={<AdminDashboard />}
              />
              <Route
                exact
                path="/admin/package/:packageId"
                element={<PackageDetails thisfor={"admin"} />}
              />

              <Route exact path="/admin/paths" element={<AdminFindPath />} />

              <Route
                exact
                path="/admin/Dashboard/Listusers"
                element={<Listusers />}
              />

              <Route
                exact
                path="/admin/Dashboard/profil"
                element={<Profil />}
              />

              <Route
                exact
                path="/admin/Dashboard/userprofil/:userId"
                element={<AdminUsersProfil />}
              />
            </Route>
          </Routes>
          {/* DeliveryCompany Routes  */}
          <Routes>
            <Route exact path="/delivery" element={<DeliveryRoute />}>
              <Route
                exact
                path="/delivery/Dashboard"
                element={<CompanieDashboard />}
              />
              <Route
                exact
                path="/delivery/Dashboard/profil"
                element={<Profil />}
              />
              <Route
                exact
                path="/delivery/Dashboard/packages"
                element={<CompaniePackages />}
              />

              <Route
                exact
                path="/delivery/Dashboard/services"
                element={<ServicesDashboard forProfil={false} isOwner={true} />}
              />

              <Route
                exact
                path="/delivery/completeprofile"
                element={<CompleteInformation />}
              />
              <Route
                exact
                path="/delivery/package/:packageId"
                element={<PackageDetails thisfor={"deliverycompanie"} />}
              />
            </Route>
          </Routes>
          {/*  Private rout shared between admins costumers and company */}
          {/* <Routes>
          <Route exact path="/profil" element={<PrivateRoute />}>
            <Route exact path="/profil" element={<Profil />} />
          </Route>
        </Routes> */}
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
