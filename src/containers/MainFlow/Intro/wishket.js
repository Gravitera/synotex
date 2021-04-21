
H : 고점, L : 저점, C : 종가, O:시가
H : 최근봉 고점, H[1] : 이전 두 번째봉 고점. H[2] : 이전 세 번째봉 고점
var1 : ‘+1’ 출현 횟수
var2 : ‘-1’ 출현 횟수
CL : ‘+1’ 출현 시 최근 종가
CS : ‘-1’ 출현 시 최근 종가 
LL : ‘+1’ 출현 시 L[2]
HH : -1’ 출현 시 H[2]

# 자바스크립트 기반으로 작성되었으며 일부 사용자함수에 대해서는 의뢰자에게 문의




input:N(4),익절(0),손절(0),진입(0),StartTime(070000),EndTime(070000),매매정지(0),lb(0),lp(0),sb(0),sp(0);
var : LL(0),HH(0),tx1(0),tx2(0),cnt(0),Tx3(0),sum(0),CL(0),CS(0);
Array : VV[20](0);
var : Tcond(false),S1(0),D1(0),TM(0),b_vv(0),Condition4(False),최고점(0),최저점(0);


Condition1 = L[4]>L[3] and L[3] >L[2] and H>H[1] and H[1]>H[2];
Condition2 = H[4]<H[3] and H[3]<H[2] and L<L[1] and L[1]<L[2];


if ( ( var2 == 0 and C > CS  and vv[0] == -1 ) or LL == 0 or  C > CL ) and condition1 == true and Condition1[1] == False Then
{
      var1 = var1+1;
      LL = L[2];
      CL = C;
      


      VV[0] = 1;
      For cnt = 1 to 19
      {
            VV[cnt] = VV[cnt-1][1];
      }

      if VV[N-1] != 0 Then
      {
            sum = 0;
            For cnt = 0 to N-1
            {
                  sum = sum + VV[cnt];
            }

      }
}
else
{
      if L < LL Then
      {         
            var1 = 0;
      }
}     

if (( var1 == 0 and C < CL  and vv[0] ==1) or hh == 0 or C < CS) and condition2 == true and Condition2[1] == False Then
{
      var2 = var2+1;
      HH = H[2];
      CS = C;
      
      VV[0] = -1;
      For cnt = 1 to 19
      {
            VV[cnt] = VV[cnt-1][1];
      }

      if VV[N-1] != 0 Then
      {
            sum = 0;
            For cnt = 0 to N-1
            {
                  sum = sum + VV[cnt];
            }

	  }
}
Else
{
      if H > HH Then
      {
            var2 = 0;
      }
}

if Bdate != Bdate[1] Then
{
     S1 = TimeToMinutes(stime);
     D1 = sdate;
	 Condition4 = False;
}

if D1 > 0 then
{
      if sdate == D1 Then
            TM = TimeToMinutes(stime)-S1;
      Else
            TM = TimeToMinutes(stime)+1440-S1;
}

if TotalTrades > TotalTrades[1] Then
{
	Condition4 = False;

	if IsExitName("Stoploss",1) == true then 
		Condition4 = true;
	if IsExitName("StopProfittarget",1) == true Then
		Condition4 = true;
}
b_vv = vv[4]+vv[3]+vv[2]+vv[1];
최고점 = highest(h,진입);
최저점 = lowest(l,진입);

if sTime > starttime and sTime < Endtime and  marketposition == 0 Then 
{
		if (b_vv == lb and sum == lp)   Then 
		{
			if 	condition4 == False  Then 
		        Buy("b");
			if (condition4 == true and TM >= TM[BarsSinceExit(1)]+매매정지)  Then 
				Buy("b1");
		}
		if (b_vv == sb and sum == sp)   Then
		{
			if 	condition4 == False  Then 
		        Sell("s");
			if (condition4 == true and TM >= TM[BarsSinceExit(1)]+매매정지)  Then
				Sell("s1");
		}
	
}	

if MarketPosition(0) != 0 and sum ==0 Then
{
	ExitLong();
	ExitShort();

}



#타겟청산
SetStopProfittarget(익절,pointstop);
SetStopLoss( 손절 ,PointStop); 
