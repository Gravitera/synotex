




var1 = 0
var2 = 0

CL, CS, LL, HH  
"""
CL : ‘+1’ 출현 시 최근 종가
CS : ‘-1’ 출현 시 최근 종가 
LL : ‘+1’ 출현 시 L[2]
HH : -1’ 출현 시 H[2]
"""

O, H, L, CL
"""
H : 고점, L : 저점, C : 종가, O:시가
"""

O1, O2, O3, O4
H1, H2, H3, H4
L1, L2, L3, L4
C1, C2, C3, C4
"""
H : 최근봉 고점, H1 : 이전 두 번째봉 고점. H2 : 이전 세 번째봉 고점
"""



condition1 = False
if L4 > L3 and L3 > L2 and H > H1 and H1 > H2:
    condition1 = True
condition2 = False
if H4 < H3 and H3 < H2 and L < L1 and L1 < L2:
    condition2 = True



################################################

if (var2 == 0 and C > CS and vv[0] == -1) or LL == 0 or C > CL) and condition1 == true