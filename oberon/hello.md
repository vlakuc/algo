MODULE hello;
  IMPORT Out;
  VAR i: INTEGER;
BEGIN
  i := 0;
  IF(i = 0) THEN INC(i) END;
  Out.String("Hello "); Out.Int(i, 0); Out.Ln
END hello.

