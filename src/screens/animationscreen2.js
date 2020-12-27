import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import background from "../../src/sky.jpg";
import background2 from "../../src/sky2.jpg";
import background3 from "../../src/sky3.jpg";
export default function Animationscreen2() {
  const [showmodal, setShowmodal] = useState(false);

  const openmodal = () => {
    setShowmodal(!showmodal);
  };

  return (
    <AnimatePresence>
      <button onClick={() => openmodal()}>Levels</button>
      {showmodal && (
        <motion.div
          style={{
            overflow: "hidden",
            backgroundColor: "#000015",
            minHeight: "100vh",
          }}
          initial={{
            opacity: 0,
            scale: 0,
            y: "-100vh",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [0, 0.5, 1],
          }}
          transition={{ duration: 1.5 }}
          exit={{ y: "-100vh", opacity: 0 }}
        >
          <div
            style={{
              overflow: "hidden",
              backgroundColor: "rgba(0,0,0,0.33)",
              minHeight: "100vh",
            }}
          >
            <div
              style={{
                color: "white",
                width: "100%",
                // border: "1px solid white",
                textAlign: "center",
                fontSize: 100,
              }}
            >
              Bettor Levels
            </div>
            <motion.div
              style={{
                // backgroundColor: "green",
                display: "flex",
                marginTop: 50,
                //   backgroundColor: "#fde264",
                height: 500,
                flexWrap: "nowrap",
              }}
              drag="x"
              dragConstraints={{ left: -9000, right: 0 }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
              dragElastic={0.2}
              initial={{ x: 0 }}
            >
              <motion.div
                style={{
                  width: 200,
                  height: 200,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 200,
                  height: 200,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background2})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 200,
                  height: 200,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background3})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 200,
                  height: 200,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 200,
                  height: 200,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 200,
                  height: 200,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 200,
                  height: 200,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 200,
                  height: 200,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  // backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  // backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
              <motion.div
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#070427",
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                whileTap={{ scale: 0.88 }}
              ></motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
