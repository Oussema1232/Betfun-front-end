import React, { useEffect } from "react";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { AlertTitle } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import Islamiccolumn from "../../commun/logos/islamiccolumn2";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import UserdomainaddItem from "../../commun/userdomainaddItem";
import { postUserdomain } from "../../features/userdomains/userdomainSlice.js";
import { loadDomains } from "../../features/domains/domainSlice.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Domainsparams() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const simplifieduserdomains = useSelector(
    (state) => state.betfundata.userdomains.listsimplified
  );
  const betdomains = useSelector((state) => state.betfundata.domains.list);
  const loadingbetdomains = useSelector(
    (state) => state.betfundata.domains.loading
  );
  const loadingpost = useSelector(
    (state) => state.betfundata.userdomains.loadingpost
  );

  const errormessage = useSelector(
    (state) => state.betfundata.userdomains.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.userdomains.onsuccess.message
  );

  useEffect(() => {
    dispatch(loadDomains());
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: 4,
        paddingBottom: 20,
        boxSizing: "border-box",

        alignItems: "center",
        border: "1px solid #d4d4d3",
        boxShadow: "0px 0px 3px 4px #d4d4d3",
        backgroundColor: "#fbfbfb",
      }}
    >
      {loadingbetdomains ? (
        <h5>Loading ...</h5>
      ) : _.xorBy(simplifieduserdomains, betdomains, "id").length > 0 ? (
        <h5
          style={{
            textAlign: "center",
          }}
        >
          Add a new domain and start betting
        </h5>
      ) : (
        <h5
          style={{
            textAlign: "center",
          }}
        >
          There are no more domains available
        </h5>
      )}
      {loadingbetdomains ? (
        <Spincrescentcomponenet size="2x" color="#2e383f" />
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {_.xorBy(simplifieduserdomains, betdomains, "id").map((d) => (
            <AnimatePresence>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{ type: "spring", stiffness: 150 }}
                exit={{
                  y: -20,
                  opacity: 0,
                  transition: {
                    ease: "easeInOut",
                    duration: 3000,
                    delay: 3000,
                  },
                }}
              >
                <UserdomainaddItem
                  domain={d}
                  loading={loadingpost[d.id]}
                  loadingdomainotfound={loadingpost["notfound"]}
                  adduserdomain={postUserdomain}
                  errormessage={errormessage}
                  successmessage={successmessage}
                  openalert={() => setOpen(true)}
                />
              </motion.div>
            </AnimatePresence>
          ))}
          {successmessage && (
            <Snackbar
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Islamiccolumn showmouth={true} dance={false} />
                  <div style={{ marginLeft: 6 }}>{successmessage}</div>
                </div>
              </Alert>
            </Snackbar>
          )}
        </div>
      )}
      {loadingpost["notfound"] == false && <div>{errormessage}</div>}
    </div>
  );
}
