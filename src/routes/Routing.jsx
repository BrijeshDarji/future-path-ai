/**
 *  @description This file is a main routing file,
 *  which handles system's route.
 */

import { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoadingFallback from "./LoadingFallback.jsx";
import HomeScreen from "../components/pages/home/HomeScreen.jsx";
import Container from "../components/containers/Container.jsx";

import { RouteList } from "./RouteList.js";

function Routing() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route exact path={"/"} element={<HomeScreen />} />
                    {RouteList.map((route, index) => {
                        const Component = route.component;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                element={
                                    <Container>
                                        <Component {...route} />
                                    </Container>
                                }
                            />
                        );
                    })}
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There&apos;s nothing here!</p>
                            </main>
                        }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default Routing;
