#define write_cmd 0x40
#define read_cmd 0x41

void i2c_init();
void i2c_start();
void i2c_stop();
void i2c_restart();
void i2c_ack();
void i2c_nak();
void waitmssp();
void i2c_send(unsigned char dat);
void i2c_send_byte(unsigned char addr,unsigned char *count);
unsigned char i2c_read();
unsigned char i2c_read_byte(unsigned char addr);

void i2c_init()
{
    TRISC0=1; TRISC1=1;
    SSP1CON1=0x28;                    //SSP Module as Master
    SSP1ADD=(32000000/(4*100000))-1;    //Setting Clock Speed, My PCLK = 11.0592MHz
}

void i2c_start()
{
    SEN1=1;
    waitmssp();
}

void i2c_stop()
{
    PEN1=1;
    waitmssp();
}

void i2c_restart()
{
    RSEN1=1;
    waitmssp();
}

void i2c_ack()
{
    ACKDT1=0;
    ACKEN1=1;
    waitmssp();
}

void i2c_nak()
{
    ACKDT1=1;
    ACKEN1=1;
    waitmssp();
}

void waitmssp()
{
    while(!SSP1IF);
//    while (   (SSP1CON2 & 0b00011111)    ||    (SSP1STAT & 0b00000100)   ) ;
    SSP1IF=0;
}

void i2c_send(unsigned char dat)
{
L1: SSP1BUF=dat;
    waitmssp();
    while(ACKSTAT1){i2c_restart;goto L1;}
}

void i2c_send_byte(unsigned char addr,unsigned char *count)
{
    i2c_start();
    i2c_send(write_cmd);
//    i2c_send(addr>>8);
    i2c_send(addr);
    while(*count) {
        i2c_send(*count++);
    }
    i2c_stop();
}

unsigned char i2c_read()
{
    RCEN1=1;
    waitmssp();
    return SSP1BUF;
}   

unsigned char i2c_read_byte(unsigned char addr)
{
    unsigned char rec;
L:  i2c_restart();
    SSP1BUF=write_cmd;
    waitmssp();
    while(ACKSTAT1){goto L;}
//    i2c_send(addr>>8);
    i2c_send(addr);
    i2c_restart();
    i2c_send(read_cmd);
    rec=i2c_read();
    i2c_nak();
    i2c_stop();
    return rec;
}
