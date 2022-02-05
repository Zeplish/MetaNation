import { Card, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
};

export default function QuickStart() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={styles.card}
        title={
          <>
            🗂️ <Text strong>Categories</Text>
          </>
        }
      ></Card>
      <Card
        style={styles.card}
        title={
          <>
            🔴 <Text strong>Subscribe to Live MetaStreams</Text>
          </>
        }
      ></Card>
      <div>
        <Card
          style={styles.card}
          title={
            <>
              🏷️ <Text strong>MetaStreams for Sale</Text>
            </>
          }
        ></Card>
      </div>
    </div>
  );
}
