#include <xc.h>
#include <stdio.h>
#include <stdlib.h>
#include "mcu.h"
#include "eusart.h"
#include "lora.h"

#include "i2c.h"

void main(void) {

    SYSTEM_Initialize();
    
    char temp [10];
    char rh [10];
    int stemp;
    int srh;
    
    
    while(!begin(915000000)){
        __delay_ms(1000);
    }
    
    i2c_init();
    
    while(1){
        while(beginPacket(false) == 0){
            __delay_ms(250);
        }
        __delay_ms(1000);

        
        //read temp and humidity from sensor
        i2c_start();
        i2c_send(0x80);
        i2c_ack();
        i2c_send(0x00); //0x00 is read command
        i2c_ack();
        i2c_restart();
        __delay_ms(1);
        i2c_send(0x81);
        int temph=i2c_read();
        i2c_ack();
        int templ=i2c_read();
        i2c_ack();
        i2c_read();
        i2c_ack();
        int rhh = i2c_read();
        i2c_ack();
        int rhl = i2c_read();
        i2c_ack();
        i2c_read();
        i2c_nak();
        i2c_stop();
        __delay_ms(1);
        i2c_start();
        i2c_send(0x80);
        i2c_send(0x40);
        i2c_stop();
        
        stemp = (temph<<8)|templ; //convert
        srh = (rhh<<8)|rhl;
        
        sprintf(temp, "%d", stemp); //convert to string
        sprintf(rh, "%d", srh);
        
        beginPacket(false);
        sendString(temp);     //send through LoRa
        sendString(" ");
        sendString(rh);
        endPacket(false);
    }
}