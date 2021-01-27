
import React, { Fragment } from 'react';
import { Router as ReachRouter, Link as ReachLink, navigate as ReachNavigate } from "@reach/router";

// Use a custom wrapper to prevent passing through DOM props
// to a non-DOM element.
// const RouterComponent = ({ children }) => <>{children}</>
export const Router = ({ children }) => <ReachRouter primary={false} component={Fragment}>{children}</ReachRouter>
export const Link = ReachLink;
export const navigate = ReachNavigate;