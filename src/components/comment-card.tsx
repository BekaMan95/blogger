import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CommentCardProps } from "./types";



export default function CommentCard({ comment }: CommentCardProps) {
    const initial = comment.name ? comment.name.trim().charAt(0).toUpperCase() : "?";

    return (
      <View style={[styles.card]}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          <View style={styles.meta}>
            <Text style={styles.name} numberOfLines={1}>
              {comment.name}
            </Text>
            <Text style={styles.email} numberOfLines={1}>
              {comment.email}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.bodyText}>{comment.body}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Reply</Text>
        </View>
      </View>
    );
}



const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e6e9ee",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginVertical: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontWeight: "700",
    color: "#0f172a",
    fontSize: 18,
  },
  meta: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    color: "#0f172a",
    fontWeight: "600",
  },
  email: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  body: {
    marginTop: 10,
  },
  bodyText: {
    fontSize: 15,
    color: "#111827",
    lineHeight: 20,
  },
  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerText: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e6e9ee",
    color: "#0f172a",
    fontSize: 14,
  },
});
