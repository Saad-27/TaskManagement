package main

import (
    "github.com/gin-gonic/gin"
    "gopkg.in/gomail.v2"
    "net/http"
)

func main() {
    r := gin.Default()

    r.POST("/api/notifications", func(c *gin.Context) {
        var notification Notification
        if err := c.ShouldBindJSON(&notification); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        // Send the notification
        if err := sendEmail(notification); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        c.JSON(http.StatusOK, gin.H{"status": "Notification sent"})
    })

    r.Run(":8082") // Run on port 8082
}

type Notification struct {
    TaskID    string `json:"task_id"`
    Message   string `json:"message"`
    Recipient string `json:"recipient"`
    Type      string `json:"type"`
}

func sendEmail(notification Notification) error {
    m := gomail.NewMessage()
    m.SetHeader("From", "your-email@example.com")
    m.SetHeader("To", notification.Recipient)
    m.SetHeader("Subject", "Task Notification")
    m.SetBody("text/plain", notification.Message)

    d := gomail.NewDialer("smtp.example.com", 587, "your-email@example.com", "your-password")

    // Send the email
    if err := d.DialAndSend(m); err != nil {
        return err
    }
    return nil
}